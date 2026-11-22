
export async function receiveQuote(request, destination) {
  if (!destination) return { status: 503, message: 'Quote submissions are temporarily unavailable. Please try again later.' };
  let fields;
  try {
    if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) {
      return { status: 415, message: 'Use the quote form to submit a request.' };
    }
    const reader = request.body.getReader();
    const decoder = new TextDecoder();
    let input = '';
    let byteCount = 0;
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      byteCount += value.length;
      if (byteCount > 24000) {
        await reader.cancel();
        return { status: 413, message: 'Your request is too long.' };
      }
      input += decoder.decode(value, { stream: true });
    }
    fields = new URLSearchParams(input + decoder.decode());
  } catch {
    return { status: 400, message: 'The request could not be read.' };
  }
  const limits = { name: 100, email: 254, company: 120, phone: 40, material: 100, quantity: 9, requirements: 4000 };
  const quote = Object.fromEntries(Object.keys(limits).map(key => [key, (fields.get(key) || '').trim()]));
  if (Object.entries(limits).some(([key, limit]) => quote[key].length > limit)) {
    return { status: 422, message: 'One or more fields exceed the maximum length.' };
  }
  if (!quote.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.email) || quote.requirements.length < 10) {
    return { status: 422, message: 'Enter your name, a valid email address, and at least 10 characters of project requirements.' };
  }
  if (quote.quantity && (!/^\d+$/.test(quote.quantity) || Number(quote.quantity) < 1 || Number(quote.quantity) > 100000000)) {
    return { status: 422, message: 'Enter a whole-number quantity between 1 and 100,000,000.' };
  }
  const id = crypto.randomUUID();
  try {
    await destination.put(`rfq/${id}.json`, JSON.stringify({ id, receivedAt: new Date().toISOString(), ...quote }), {
      httpMetadata: { contentType: 'application/json' },
    });
    return { status: 201, message: `Your request was saved. Reference ${id}.` };
  } catch {
    return { status: 503, message: 'Your request could not be saved. Please try again.' };
  }
}
