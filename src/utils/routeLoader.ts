import fs from 'fs';
import path from 'path';
import { Request, Response } from '../types';

const normalizePath = (url: string) => {
  return url.replace(/\/$/, '');
};

export const loadRoutes = (routesDir: string, req: Request, res: Response) => {
  const walkDir = (dir: string, prefix = '') => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        // Recursively process subdirectories (like /v1)
        walkDir(fullPath, `${prefix}/${file}`);
      } else if (file.endsWith('.ts') || file.endsWith('.js')) {
        // Calculate the full route path for the current file
        const routePath = prefix + (file === 'index.ts' ? '' : `/${file.replace(/\.(ts|js)$/, '')}`);

        const routeHandler = require(fullPath) as { [method: string]: (req: Request, res: Response) => void };

        if (typeof routeHandler === 'object') {
          Object.entries(routeHandler).forEach(([method, handler]) => {
            const methodLower = method.toLowerCase();

            const normalizedRoutePath = normalizePath(routePath);
            const normalizedUrl = normalizePath(req.url || '');

            if (req.method?.toLowerCase() === methodLower && normalizedRoutePath === normalizedUrl) {
              console.log(`Handling route ${method} on ${routePath}`);
              handler(req, res);
            }
          });
        } else {
          console.error(`No valid handlers exported from ${fullPath}.`);
        }
      }
    });
  };

  walkDir(routesDir);
};
