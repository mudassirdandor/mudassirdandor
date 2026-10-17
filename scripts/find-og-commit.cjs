const { execSync } = require('child_process');

try {
  const show = execSync('git show --stat 8ea3527', { encoding: 'utf8' });
  console.log('Git show 8ea3527:\n', show);
} catch (e) {
  console.error(e.message);
}
