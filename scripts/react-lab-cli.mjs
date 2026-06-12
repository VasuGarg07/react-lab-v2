#!/usr/bin/env node
import { select, checkbox } from '@inquirer/prompts';
import { spawnSync } from 'child_process';
import chalk from 'chalk';

const APPS = [
  { name: 'showcase',           pkg: '@react-lab/showcase',           firebase: 'showcase' },
  { name: 'blogify',            pkg: '@react-lab/blogify',            firebase: 'blogify' },
  { name: 'budget-buddy',       pkg: '@react-lab/budget-buddy',       firebase: 'budget-buddy' },
  { name: 'formlyst',           pkg: '@react-lab/formlyst',           firebase: 'formlyst' },
  { name: 'invoice-gen',        pkg: '@react-lab/invoice-gen',        firebase: 'invoice-gen' },
  { name: 'json-live',          pkg: '@react-lab/json-live',          firebase: 'json-live' },
  { name: 'loan-wizard',        pkg: '@react-lab/loan-wizard',        firebase: 'loan-wizard' },
  { name: 'markdown-live',      pkg: '@react-lab/markdown-live',      firebase: 'markdown-live' },
  { name: 'poke-memory',        pkg: '@react-lab/poke-memory',        firebase: 'poke-memory' },
  { name: 'pokeverse',          pkg: '@react-lab/pokeverse',          firebase: 'pokeverse' },
  { name: 'quizzo',             pkg: '@react-lab/quizzo',             firebase: 'quizzo' },
  { name: 'recipe-haven',       pkg: '@react-lab/recipe-haven',       firebase: 'recipe-haven' },
  { name: 'sorting-visualizer', pkg: '@react-lab/sorting-visualizer', firebase: 'sorting-visualizer' },
  { name: 'sudoku',             pkg: '@react-lab/sudoku',             firebase: 'sudoku' },
  { name: 'super-tic-tac-toe',  pkg: '@react-lab/super-tic-tac-toe', firebase: 'super-tic-tac-toe' },
];

const c = {
  brand:   str => chalk.bold.hex('#FF6D00')(str),
  dim:     str => chalk.dim(str),
  info:    str => chalk.cyan('i ') + str,
  success: str => chalk.green('✔ ') + chalk.bold(str),
  error:   str => chalk.red('✖ ') + chalk.bold(str),
  cmd:     str => chalk.dim('$ ') + chalk.white(str),
  section: str => chalk.bold.white(str),
};

function header() {
  console.log();
  console.log(c.brand('  ██████╗ ███████╗ █████╗  ██████╗████████╗    ██╗      █████╗ ██████╗ '));
  console.log(c.brand('  ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝    ██║     ██╔══██╗██╔══██╗'));
  console.log(c.brand('  ██████╔╝█████╗  ███████║██║        ██║       ██║     ███████║██████╔╝'));
  console.log(c.brand('  ██╔══██╗██╔══╝  ██╔══██║██║        ██║       ██║     ██╔══██║██╔══██╗'));
  console.log(c.brand('  ██║  ██║███████╗██║  ██║╚██████╗   ██║       ███████╗██║  ██║██████╔╝'));
  console.log(c.brand('  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═╝       ╚══════╝╚═╝  ╚═╝╚═════╝ '));
  console.log();
  console.log(c.dim('  pnpm workspace · Turborepo · Firebase Hosting'));
  console.log();
}

function run(cmd, args) {
  console.log();
  console.log(c.cmd(`${cmd} ${args.join(' ')}`));
  console.log();
  const result = spawnSync(cmd, args, { stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    console.log();
    console.log(c.error('Command failed.'));
    process.exit(result.status ?? 1);
  }
}

function done(action, apps) {
  const names = apps.length === APPS.length ? 'all apps' : apps.map(a => a.name).join(', ');
  console.log();
  console.log(c.success(`${action} complete — ${names}`));
  console.log();
}

async function pickApps(action) {
  const selected = await checkbox({
    message: `Select apps to ${action}:`,
    choices: [
      { name: chalk.bold('All apps'), value: '__all__' },
      ...APPS.map(a => ({ name: a.name, value: a.name })),
    ],
    validate: v => v.length > 0 || 'Pick at least one.',
  });

  if (selected.includes('__all__')) return APPS;
  return APPS.filter(a => selected.includes(a.name));
}

function buildCmd(apps) {
  const all = apps.length === APPS.length;
  if (all) return ['pnpm', ['turbo', 'build']];
  if (apps.length === 1) return ['pnpm', ['--filter', apps[0].pkg, 'build']];
  return ['pnpm', [...apps.flatMap(a => ['--filter', a.pkg]), 'build']];
}

async function main() {
  header();

  const action = await select({
    message: 'What do you want to do?',
    choices: [
      { name: `${chalk.green('Dev')}     start dev server(s)`,          value: 'dev' },
      { name: `${chalk.yellow('Build')}   production build`,              value: 'build' },
      { name: `${chalk.blue('Deploy')}  build then deploy to Firebase`,  value: 'deploy' },
      { name: `${chalk.magenta('Preview')} serve built output locally`,    value: 'preview' },
    ],
  });

  const apps = await pickApps(action);
  const all = apps.length === APPS.length;

  if (action === 'dev') {
    console.log(c.info(`Starting dev server${apps.length > 1 ? 's' : ''} for ${all ? 'all apps' : apps.map(a => a.name).join(', ')}...`));
    if (all) run('pnpm', ['turbo', 'dev']);
    else if (apps.length === 1) run('pnpm', ['--filter', apps[0].pkg, 'dev']);
    else run('pnpm', [...apps.flatMap(a => ['--filter', a.pkg]), 'dev']);
    return;
  }

  if (action === 'build') {
    console.log(c.info(`Building ${all ? 'all apps' : apps.map(a => a.name).join(', ')}...`));
    const [cmd, args] = buildCmd(apps);
    run(cmd, args);
    done('Build', apps);
    return;
  }

  if (action === 'preview') {
    console.log(c.info(`Starting preview server${apps.length > 1 ? 's' : ''} for ${all ? 'all apps' : apps.map(a => a.name).join(', ')}...`));
    if (all) run('pnpm', ['turbo', 'preview']);
    else if (apps.length === 1) run('pnpm', ['--filter', apps[0].pkg, 'preview']);
    else run('pnpm', [...apps.flatMap(a => ['--filter', a.pkg]), 'preview']);
    return;
  }

  if (action === 'deploy') {
    console.log(c.info(`Building ${all ? 'all apps' : apps.map(a => a.name).join(', ')} before deploy...`));
    const [cmd, args] = buildCmd(apps);
    run(cmd, args);

    console.log(c.info(`Deploying to Firebase Hosting...`));
    if (all) {
      run('firebase', ['deploy', '--only', 'hosting']);
    } else {
      const targets = apps.map(a => `hosting:${a.firebase}`).join(',');
      run('firebase', ['deploy', '--only', targets]);
    }
    done('Deploy', apps);
  }
}

main().catch(err => {
  console.error(c.error(err.message ?? err));
  process.exit(1);
});
