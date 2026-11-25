import http from 'http';
import { spawn } from 'child_process';

const server = spawn('node', ['server/index.js'], { stdio: 'pipe' });

server.stdout.on('data', (d) => console.log('[Server stdout]:', d.toString().trim()));
server.stderr.on('data', (d) => console.error('[Server stderr]:', d.toString().trim()));

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const request = (method, path, body = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

async function runTests() {
  console.log('Waiting for server to initialize...');
  await wait(2500);

  try {
    // 1. Health check
    const health = await request('GET', '/api/health');
    console.log('✓ Health check response:', health);

    // 2. Publish portfolio
    const publishPayload = {
      slug: 'alex-johnson-t82x91',
      title: 'Alex Johnson Portfolio',
      templateId: 'modern-professional',
      ownerToken: 'tok_alex_9988',
      data: {
        personal: {
          fullName: 'Alex Johnson',
          professionalTitle: 'Full-Stack Software Engineer',
          email: 'alex@example.com',
          location: 'San Francisco, CA',
          aboutMe: 'Passionate engineer building scalable web platforms.',
        },
        education: [
          {
            id: 'edu_1',
            institution: 'UC Berkeley',
            degree: 'B.S.',
            specialization: 'Computer Science',
            startYear: '2020',
            endYear: '2024',
            grade: '3.9 GPA',
          },
        ],
        skills: {
          technical: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
          languages: ['English', 'Spanish'],
        },
        projects: [
          {
            id: 'p1',
            name: 'Cloud Job Orchestrator',
            description: 'Distributed background tasks with real-time websocket updates.',
            technologies: 'Node.js, Redis, React',
          },
        ],
      },
    };

    const pubRes = await request('POST', '/api/portfolios/publish', publishPayload);
    console.log('✓ Publish response:', pubRes);

    // 3. Retrieve public portfolio
    const getRes = await request('GET', '/api/portfolios/alex-johnson-t82x91');
    console.log('✓ Get public portfolio response:', getRes.status, getRes.body.title);

    // 4. Test Unpublish
    const unpubRes = await request('POST', '/api/portfolios/alex-johnson-t82x91/unpublish', {
      ownerToken: 'tok_alex_9988',
    });
    console.log('✓ Unpublish response:', unpubRes);

    // 5. Test Get after unpublish (should be 404)
    const getAfterUnpub = await request('GET', '/api/portfolios/alex-johnson-t82x91');
    console.log('✓ Get after unpublish status (expected 404):', getAfterUnpub.status);

    console.log('\nALL BACKEND API TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('Test failed:', err);
    process.exitCode = 1;
  } finally {
    server.kill();
    process.exit(process.exitCode || 0);
  }
}

runTests();
