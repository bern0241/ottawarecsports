export const listTeamsWithPlayers = /* GraphQL */ `
	query ListTeams(
		$filter: ModelTeamFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
            away_colour
            captains
            createdAt
            founded
            home_colour
            id
            name
            team_picture
            updatedAt
            Players {
                items {
                createdAt
                id
                role
                teamID
                updatedAt
                user_id
                }
            }
            Divisions {
                items {
                updatedAt
                teamId
                id
                divisionId
                createdAt
                }
            }
            }
			nextToken
		}
	}
`;