const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OPENAPI_URL = 'http://localhost:3000/openapi.json';
const OPENAPI_JSON_PATH = path.join(__dirname, '..', 'openapi.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'types');

async function fetchOpenApiJson() {
  try {
    const response = await axios.get(OPENAPI_URL);
    fs.writeFileSync(OPENAPI_JSON_PATH, JSON.stringify(response.data, null, 2));
    console.log('OpenAPI JSON downloaded successfully');
  } catch (error) {
    console.error('Error fetching OpenAPI JSON:', error);
  }
}

function generateTypes() {
  try {
    // Generate types using openapi-generator-cli
    execSync(`openapi-generator-cli generate -i ${OPENAPI_JSON_PATH} -g typescript-fetch -o ${OUTPUT_DIR}`, { stdio: 'inherit' });

    // Read the generated index file
    const generatedIndexPath = path.join(OUTPUT_DIR, 'index.ts');
    const generatedIndexContent = fs.readFileSync(generatedIndexPath, 'utf8');

    // Create a new file with extracted types
    const typesFilePath = path.join(OUTPUT_DIR, 'api.d.ts');
    const typesContent = `
    ${generatedIndexContent}

    // Export individual types
    export type User = components['schemas']['User'];
    `;

    // Write the new content to types file
    fs.writeFileSync(typesFilePath, typesContent);

    console.log('Types generated successfully!');
  } catch (error) {
    console.error('Error generating types:', error);
  }
}

async function main() {
  await fetchOpenApiJson();
  generateTypes();
}

main();
