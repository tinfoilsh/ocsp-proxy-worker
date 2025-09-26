export default {
  async fetch(request) {
    const response = await fetch('https://ocsp.ndis.nvidia.com/', {
      method: request.method,
      headers: {
        'Content-Type': request.headers.get('Content-Type') || 'application/ocsp-request',
      },
      body: request.method !== 'GET' ? await request.arrayBuffer() : undefined,
    });
    
    return new Response(await response.arrayBuffer(), {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/ocsp-response',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};