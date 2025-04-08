export function processData(digested: any, data: any): any {
	const league = data?.league || {}

	return {
		...digested,
		league: {
			dire: league.dire ?? null,
			radiant: league.radiant ?? null,
			description: league.description ?? '',
			name: league.name ?? '',
			series_type: league.series_type ?? null,
		},
	}
}
