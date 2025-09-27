async function testLoginAPI() {
  const url = 'http://localhost:3000/api/auth/login';
  const credentials = {
    email: 'admin@vcail.unc.edu',
    password: 'admin123'
  };

  console.log('Testing login API...');
  console.log('URL:', url);
  console.log('Credentials:', credentials);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Response data:', data);

    if (response.ok) {
      console.log('✅ Login API works!');
    } else {
      console.log('❌ Login API failed:', data.error);
    }
  } catch (error) {
    console.error('❌ Error calling login API:', error);
  }
}

testLoginAPI();

