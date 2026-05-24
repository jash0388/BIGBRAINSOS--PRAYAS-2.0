import { Router } from 'express';
import Docker from 'dockerode';
import { supabaseAdmin } from '../lib/supabase.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
const docker = new Docker();

// Track assigned ports
let nextPort = 6100;

/**
 * Find a free port starting from nextPort
 */
const getNextPort = () => {
  return nextPort++;
};

// POST /api/containers/start — start an app container for user
router.post('/start', authMiddleware, async (req, res) => {
  const { appName } = req.body;
  const userId = req.user.id;

  if (!appName) {
    return res.status(400).json({ error: 'appName is required' });
  }

  try {
    // Check if user already has a running container for this app
    const { data: existing } = await supabaseAdmin
      .from('containers')
      .select('*')
      .eq('user_id', userId)
      .eq('app_name', appName)
      .eq('status', 'running')
      .single();

    if (existing) {
      return res.json({
        container: existing,
        streamUrl: `http://localhost:${existing.port}/vnc.html?resize=remote&autoconnect=true`,
        message: 'Container already running'
      });
    }

    // Determine which Docker image to use
    const imageMap = {
      'vscode': 'bigbrains-os-vscode',
      'terminal': 'bigbrains-os-terminal',
      'browser': 'bigbrains-os-browser',
    };

    const image = imageMap[appName.toLowerCase()];
    if (!image) {
      return res.status(400).json({ error: `Unknown app: ${appName}` });
    }

    const port = getNextPort();
    const containerName = `bigbrains-${userId.slice(0, 8)}-${appName.toLowerCase()}`;

    // Create and start the container
    const container = await docker.createContainer({
      Image: image,
      name: containerName,
      ExposedPorts: { [`${port}/tcp`]: {} },
      HostConfig: {
        PortBindings: {
          '6080/tcp': [{ HostPort: String(port) }],
        },
        Memory: 512 * 1024 * 1024, // 512MB limit
        CpuPeriod: 100000,
        CpuQuota: 50000, // 50% CPU
        RestartPolicy: { Name: 'unless-stopped' },
      },
      Env: [
        `VNC_PASSWORD=bigbrains`,
        `USER_ID=${userId}`,
      ],
    });

    await container.start();

    // Save to database
    const { data: savedContainer, error } = await supabaseAdmin
      .from('containers')
      .insert({
        user_id: userId,
        app_name: appName,
        port: port,
        container_id: container.id,
        status: 'running',
      })
      .select()
      .single();

    if (error) {
      console.error('DB error:', error);
    }

    res.json({
      container: savedContainer,
      streamUrl: `http://localhost:${port}/vnc.html?resize=remote&autoconnect=true`,
      message: 'Container started'
    });

  } catch (err) {
    console.error('Container start error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/containers/stop — stop a container
router.post('/stop', authMiddleware, async (req, res) => {
  const { containerId } = req.body;
  const userId = req.user.id;

  try {
    const { data: containerRecord } = await supabaseAdmin
      .from('containers')
      .select('*')
      .eq('id', containerId)
      .eq('user_id', userId)
      .single();

    if (!containerRecord) {
      return res.status(404).json({ error: 'Container not found' });
    }

    const container = docker.getContainer(containerRecord.container_id);
    await container.stop();
    await container.remove();

    await supabaseAdmin
      .from('containers')
      .update({ status: 'stopped' })
      .eq('id', containerId);

    res.json({ message: 'Container stopped' });
  } catch (err) {
    console.error('Container stop error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/containers — list user's containers
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  const { data: containers, error } = await supabaseAdmin
    .from('containers')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'running');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ containers });
});

export default router;
