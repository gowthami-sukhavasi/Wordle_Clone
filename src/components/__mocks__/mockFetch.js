const apiResponse = {
  is_valid_word: true,
  score: [2, 0, 0, 2, 2],
};

export default async function mockFetch(url) {
  switch (url) {
    case "https://wordle-apis.vercel.app/api/validate": {
      return {
        ok: true,
        status: 200,
        json: async () => apiResponse,
      };
    }
  }
}
