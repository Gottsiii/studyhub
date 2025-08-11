export const config = {
  dbUrl: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/studyhub',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  openWeatherKey: process.env.OPENWEATHER_KEY || '',
};
