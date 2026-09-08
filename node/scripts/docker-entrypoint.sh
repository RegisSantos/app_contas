#!/bin/sh
set -e

echo "Running migrations (conditional)..."

echo "Waiting for database..."
node ./scripts/wait-for-db.js

# Only run migrations/seeds in development when explicitly enabled
if [ "$DEV_MIGRATE" = "true" ] || [ "$NODE_ENV" != "production" ] ; then
	echo "DEV_MIGRATE is true or NODE_ENV!=production — running migrations/seeds"
	npm run migrate
	npm run seed
else
	echo "Skipping migrations/seeds in production (set DEV_MIGRATE=true to override)"
fi

echo "Starting server..."
exec npm start
