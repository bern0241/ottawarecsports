/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSportsmanshipPoint = /* GraphQL */ `
	mutation CreateSportsmanshipPoint(
		$input: CreateSportsmanshipPointInput!
		$condition: ModelSportsmanshipPointConditionInput
	) {
		createSportsmanshipPoint(input: $input, condition: $condition) {
			id
			points
			createdAt
			updatedAt
		}
	}
`;
export const updateSportsmanshipPoint = /* GraphQL */ `
	mutation UpdateSportsmanshipPoint(
		$input: UpdateSportsmanshipPointInput!
		$condition: ModelSportsmanshipPointConditionInput
	) {
		updateSportsmanshipPoint(input: $input, condition: $condition) {
			id
			points
			createdAt
			updatedAt
		}
	}
`;
export const deleteSportsmanshipPoint = /* GraphQL */ `
	mutation DeleteSportsmanshipPoint(
		$input: DeleteSportsmanshipPointInput!
		$condition: ModelSportsmanshipPointConditionInput
	) {
		deleteSportsmanshipPoint(input: $input, condition: $condition) {
			id
			points
			createdAt
			updatedAt
		}
	}
`;
export const createPlayer = /* GraphQL */ `
	mutation CreatePlayer(
		$input: CreatePlayerInput!
		$condition: ModelPlayerConditionInput
	) {
		createPlayer(input: $input, condition: $condition) {
			id
			user_id
			soccer_stats {
				id
				team
				division
				position
				goals
				assists
				yellow_cards
				red_cards
				games_played
			}
			createdAt
			updatedAt
		}
	}
`;
export const updatePlayer = /* GraphQL */ `
	mutation UpdatePlayer(
		$input: UpdatePlayerInput!
		$condition: ModelPlayerConditionInput
	) {
		updatePlayer(input: $input, condition: $condition) {
			id
			user_id
			soccer_stats {
				id
				team
				division
				position
				goals
				assists
				yellow_cards
				red_cards
				games_played
			}
			createdAt
			updatedAt
		}
	}
`;
export const deletePlayer = /* GraphQL */ `
	mutation DeletePlayer(
		$input: DeletePlayerInput!
		$condition: ModelPlayerConditionInput
	) {
		deletePlayer(input: $input, condition: $condition) {
			id
			user_id
			soccer_stats {
				id
				team
				division
				position
				goals
				assists
				yellow_cards
				red_cards
				games_played
			}
			createdAt
			updatedAt
		}
	}
`;
export const createGame = /* GraphQL */ `
	mutation CreateGame(
		$input: CreateGameInput!
		$condition: ModelGameConditionInput
	) {
		createGame(input: $input, condition: $condition) {
			id
			division
			date
			location
			status
			home_roster
			away_roster
			home_score
			away_score
			goals
			round
			referees
			HomeTeam {
				id
				name
				founded
				home_colour
				away_colour
				team_picture
				createdAt
				updatedAt
			}
			AwayTeam {
				id
				name
				founded
				home_colour
				away_colour
				team_picture
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
			gameHomeTeamId
			gameAwayTeamId
		}
	}
`;
export const updateGame = /* GraphQL */ `
	mutation UpdateGame(
		$input: UpdateGameInput!
		$condition: ModelGameConditionInput
	) {
		updateGame(input: $input, condition: $condition) {
			id
			division
			date
			location
			status
			home_roster
			away_roster
			home_score
			away_score
			goals
			round
			referees
			HomeTeam {
				id
				name
				founded
				home_colour
				away_colour
				team_picture
				createdAt
				updatedAt
			}
			AwayTeam {
				id
				name
				founded
				home_colour
				away_colour
				team_picture
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
			gameHomeTeamId
			gameAwayTeamId
		}
	}
`;
export const deleteGame = /* GraphQL */ `
	mutation DeleteGame(
		$input: DeleteGameInput!
		$condition: ModelGameConditionInput
	) {
		deleteGame(input: $input, condition: $condition) {
			id
			division
			date
			location
			status
			home_roster
			away_roster
			home_score
			away_score
			goals
			round
			referees
			HomeTeam {
				id
				name
				founded
				home_colour
				away_colour
				team_picture
				createdAt
				updatedAt
			}
			AwayTeam {
				id
				name
				founded
				home_colour
				away_colour
				team_picture
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
			gameHomeTeamId
			gameAwayTeamId
		}
	}
`;
export const createDivision = /* GraphQL */ `
	mutation CreateDivision(
		$input: CreateDivisionInput!
		$condition: ModelDivisionConditionInput
	) {
		createDivision(input: $input, condition: $condition) {
			id
			name
			abbreviation
			teams
			season
			Games {
				nextToken
			}
			level
			description
			is_playoff
			Teams {
				nextToken
			}
			createdAt
			updatedAt
		}
	}
`;
export const updateDivision = /* GraphQL */ `
	mutation UpdateDivision(
		$input: UpdateDivisionInput!
		$condition: ModelDivisionConditionInput
	) {
		updateDivision(input: $input, condition: $condition) {
			id
			name
			abbreviation
			teams
			season
			Games {
				nextToken
			}
			level
			description
			is_playoff
			Teams {
				nextToken
			}
			createdAt
			updatedAt
		}
	}
`;
export const deleteDivision = /* GraphQL */ `
	mutation DeleteDivision(
		$input: DeleteDivisionInput!
		$condition: ModelDivisionConditionInput
	) {
		deleteDivision(input: $input, condition: $condition) {
			id
			name
			abbreviation
			teams
			season
			Games {
				nextToken
			}
			level
			description
			is_playoff
			Teams {
				nextToken
			}
			createdAt
			updatedAt
		}
	}
`;
export const createSeason = /* GraphQL */ `
	mutation CreateSeason(
		$input: CreateSeasonInput!
		$condition: ModelSeasonConditionInput
	) {
		createSeason(input: $input, condition: $condition) {
			id
			league
			name
			abbreviation
			start_date
			end_date
			Divisions {
				nextToken
			}
			is_completed
			createdAt
			updatedAt
		}
	}
`;
export const updateSeason = /* GraphQL */ `
	mutation UpdateSeason(
		$input: UpdateSeasonInput!
		$condition: ModelSeasonConditionInput
	) {
		updateSeason(input: $input, condition: $condition) {
			id
			league
			name
			abbreviation
			start_date
			end_date
			Divisions {
				nextToken
			}
			is_completed
			createdAt
			updatedAt
		}
	}
`;
export const deleteSeason = /* GraphQL */ `
	mutation DeleteSeason(
		$input: DeleteSeasonInput!
		$condition: ModelSeasonConditionInput
	) {
		deleteSeason(input: $input, condition: $condition) {
			id
			league
			name
			abbreviation
			start_date
			end_date
			Divisions {
				nextToken
			}
			is_completed
			createdAt
			updatedAt
		}
	}
`;
export const createLeague = /* GraphQL */ `
	mutation CreateLeague(
		$input: CreateLeagueInput!
		$condition: ModelLeagueConditionInput
	) {
		createLeague(input: $input, condition: $condition) {
			id
			name
			sport
			date_founded
			cost_per_individual
			cost_per_team
			coordinators
			Seasons {
				nextToken
			}
			description
			number_of_periods
			time_per_period
			createdAt
			updatedAt
		}
	}
`;
export const updateLeague = /* GraphQL */ `
	mutation UpdateLeague(
		$input: UpdateLeagueInput!
		$condition: ModelLeagueConditionInput
	) {
		updateLeague(input: $input, condition: $condition) {
			id
			name
			sport
			date_founded
			cost_per_individual
			cost_per_team
			coordinators
			Seasons {
				nextToken
			}
			description
			number_of_periods
			time_per_period
			createdAt
			updatedAt
		}
	}
`;
export const deleteLeague = /* GraphQL */ `
	mutation DeleteLeague(
		$input: DeleteLeagueInput!
		$condition: ModelLeagueConditionInput
	) {
		deleteLeague(input: $input, condition: $condition) {
			id
			name
			sport
			date_founded
			cost_per_individual
			cost_per_team
			coordinators
			Seasons {
				nextToken
			}
			description
			number_of_periods
			time_per_period
			createdAt
			updatedAt
		}
	}
`;
export const createTeamNote = /* GraphQL */ `
	mutation CreateTeamNote(
		$input: CreateTeamNoteInput!
		$condition: ModelTeamNoteConditionInput
	) {
		createTeamNote(input: $input, condition: $condition) {
			id
			date
			description
			team_id
			author_id
			createdAt
			updatedAt
		}
	}
`;
export const updateTeamNote = /* GraphQL */ `
	mutation UpdateTeamNote(
		$input: UpdateTeamNoteInput!
		$condition: ModelTeamNoteConditionInput
	) {
		updateTeamNote(input: $input, condition: $condition) {
			id
			date
			description
			team_id
			author_id
			createdAt
			updatedAt
		}
	}
`;
export const deleteTeamNote = /* GraphQL */ `
	mutation DeleteTeamNote(
		$input: DeleteTeamNoteInput!
		$condition: ModelTeamNoteConditionInput
	) {
		deleteTeamNote(input: $input, condition: $condition) {
			id
			date
			description
			team_id
			author_id
			createdAt
			updatedAt
		}
	}
`;
export const createTeam = /* GraphQL */ `
	mutation CreateTeam(
		$input: CreateTeamInput!
		$condition: ModelTeamConditionInput
	) {
		createTeam(input: $input, condition: $condition) {
			id
			name
			founded
			home_colour
			away_colour
			TeamNotes {
				nextToken
			}
			team_history {
				id
				team
				division
				roster
				goals
				assists
				yellow_cards
				red_cards
				games_played
				captains
			}
			team_picture
			divisions {
				nextToken
			}
			createdAt
			updatedAt
		}
	}
`;
export const updateTeam = /* GraphQL */ `
	mutation UpdateTeam(
		$input: UpdateTeamInput!
		$condition: ModelTeamConditionInput
	) {
		updateTeam(input: $input, condition: $condition) {
			id
			name
			founded
			home_colour
			away_colour
			TeamNotes {
				nextToken
			}
			team_history {
				id
				team
				division
				roster
				goals
				assists
				yellow_cards
				red_cards
				games_played
				captains
			}
			team_picture
			divisions {
				nextToken
			}
			createdAt
			updatedAt
		}
	}
`;
export const deleteTeam = /* GraphQL */ `
	mutation DeleteTeam(
		$input: DeleteTeamInput!
		$condition: ModelTeamConditionInput
	) {
		deleteTeam(input: $input, condition: $condition) {
			id
			name
			founded
			home_colour
			away_colour
			TeamNotes {
				nextToken
			}
			team_history {
				id
				team
				division
				roster
				goals
				assists
				yellow_cards
				red_cards
				games_played
				captains
			}
			team_picture
			divisions {
				nextToken
			}
			createdAt
			updatedAt
		}
	}
`;
export const createPlayerNote = /* GraphQL */ `
	mutation CreatePlayerNote(
		$input: CreatePlayerNoteInput!
		$condition: ModelPlayerNoteConditionInput
	) {
		createPlayerNote(input: $input, condition: $condition) {
			id
			player_id
			date
			description
			author_id
			createdAt
			updatedAt
		}
	}
`;
export const updatePlayerNote = /* GraphQL */ `
	mutation UpdatePlayerNote(
		$input: UpdatePlayerNoteInput!
		$condition: ModelPlayerNoteConditionInput
	) {
		updatePlayerNote(input: $input, condition: $condition) {
			id
			player_id
			date
			description
			author_id
			createdAt
			updatedAt
		}
	}
`;
export const deletePlayerNote = /* GraphQL */ `
	mutation DeletePlayerNote(
		$input: DeletePlayerNoteInput!
		$condition: ModelPlayerNoteConditionInput
	) {
		deletePlayerNote(input: $input, condition: $condition) {
			id
			player_id
			date
			description
			author_id
			createdAt
			updatedAt
		}
	}
`;
export const createDivisionTeam = /* GraphQL */ `
	mutation CreateDivisionTeam(
		$input: CreateDivisionTeamInput!
		$condition: ModelDivisionTeamConditionInput
	) {
		createDivisionTeam(input: $input, condition: $condition) {
			id
			divisionId
			teamId
			division {
				id
				name
				abbreviation
				teams
				season
				level
				description
				is_playoff
				createdAt
				updatedAt
			}
			team {
				id
				name
				founded
				home_colour
				away_colour
				team_picture
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
	}
`;
export const updateDivisionTeam = /* GraphQL */ `
	mutation UpdateDivisionTeam(
		$input: UpdateDivisionTeamInput!
		$condition: ModelDivisionTeamConditionInput
	) {
		updateDivisionTeam(input: $input, condition: $condition) {
			id
			divisionId
			teamId
			division {
				id
				name
				abbreviation
				teams
				season
				level
				description
				is_playoff
				createdAt
				updatedAt
			}
			team {
				id
				name
				founded
				home_colour
				away_colour
				team_picture
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
	}
`;
export const deleteDivisionTeam = /* GraphQL */ `
	mutation DeleteDivisionTeam(
		$input: DeleteDivisionTeamInput!
		$condition: ModelDivisionTeamConditionInput
	) {
		deleteDivisionTeam(input: $input, condition: $condition) {
			id
			divisionId
			teamId
			division {
				id
				name
				abbreviation
				teams
				season
				level
				description
				is_playoff
				createdAt
				updatedAt
			}
			team {
				id
				name
				founded
				home_colour
				away_colour
				team_picture
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
	}
`;
