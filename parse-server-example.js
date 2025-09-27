// Simple Parse Server for local testing
const express = require('express');
const { ParseServer } = require('parse-server');
const path = require('path');

const app = express();

// Parse Server configuration
const api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // MongoDB connection string
  appId: 'myAppId', // Application ID
  masterKey: 'myMasterKey', // Master key (keep this secret!)
  serverURL: 'http://localhost:1337/parse', // Server URL
  publicServerURL: 'http://localhost:1337/parse', // Public server URL
  allowClientClassCreation: true, // Allow clients to create new classes
  enableAnonymousUsers: false, // Disable anonymous users for security
});

// Serve Parse API on /parse URL prefix
app.use('/parse', api.app);

// Parse Dashboard configuration endpoint
app.get('/dashboard-config', (req, res) => {
  res.json({
    apps: [{
      serverURL: 'http://localhost:1337/parse',
      appId: 'myAppId',
      masterKey: 'myMasterKey',
      appName: 'My Test App'
    }]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Parse Server is running!' });
});

const port = process.env.PORT || 1337;

// Start the server and initialize Parse Server
app.listen(port, async function() {
  console.log('🚀 Parse Server running on port ' + port + '.');
  console.log('📊 Dashboard config available at: http://localhost:' + port + '/dashboard-config');
  console.log('🔗 Server URL: http://localhost:' + port + '/parse');
  console.log('📱 App ID: myAppId');
  console.log('🔑 Master Key: myMasterKey');
  
  // Initialize Parse Server
  try {
    await api.start();
    console.log('✅ Parse Server initialized successfully');
  } catch (error) {
    console.error('❌ Parse Server initialization failed:', error);
  }
});