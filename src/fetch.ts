const baseFetch = async (userID: string, docID: string, fbID: string) => {
	const data = await fetch("https://www.threads.net/api/graphql", {
		headers: {
			"accept-language": "en-US,en;q=0.8",
			"content-type": "application/x-www-form-urlencoded",
			"user-agent": "Threads API (only education)",
			"sec-fetch-site": "same-origin",
			"x-fb-lsd": `${fbID}`,
			"x-ig-app-id": `${process.env.IG_APP}`,
		},
		body: `lsd=${fbID}&variables={userID:${userID}}&doc_id=${docID}`,
		method: "POST",
	});
	const parserData = await data.json();

	return parserData;
};
export default baseFetch;
