/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSportsmanshipPoint = /* GraphQL */ `
	subscription OnCreateSportsmanshipPoint(
		$filter: ModelSubscriptionSportsmanshipPointFilterInput
	) {
		onCreateSportsmanshipPoint(filter: $filter) {
			id
			points
			createdAt
			updatedAt
		}
	}
`;
export const onUpdateSportsmanshipPoint = /* GraphQL */ `
	subscription OnUpdateSportsmanshipPoint(
		$filter: ModelSubscriptionSportsmanshipPointFilterInput
	) {
		onUpdateSportsmanshipPoint(filter: $filter) {
			id
			points
			createdAt
			updatedAt
		}
	}
`;
export const onDeleteSportsmanshipPoint = /* GraphQL */ `
	subscription OnDeleteSportsmanshipPoint(
		$filter: ModelSubscriptionSportsmanshipPointFilterInput
	) {
		onDeleteSportsmanshipPoint(filter: $filter) {
			id
			points
			createdAt
			updatedAt
		}
	}
`;
export const onCreatePlayer = /* GraphQL */ `
	subscription OnCreatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
		onCreatePlayer(filter: $filter) {
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
export const onUpdatePlayer = /* GraphQL */ `
	subscription OnUpdatePlayer($filter: ModelSubscriptionPlayerFilterInput) {
		onUpdatePlayer(filter: $filter) {
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
export const onDeletePlayer = /* GraphQL */ `
	subscription OnDeletePlayer($filter: ModelSubscriptionPlayerFilterInput) {
		onDeletePlayer(filter: $filter) {
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
export const onCreateGame = /* GraphQL */ `
	subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
		onCreateGame(filter: $filter) {
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
export const onUpdateGame = /* GraphQL */ `
	subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
		onUpdateGame(filter: $filter) {
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
export const onDeleteGame = /* GraphQL */ `
	subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
		onDeleteGame(filter: $filter) {
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
export const onCreateDivision = /* GraphQL */ `
	subscription OnCreateDivision($filter: ModelSubscriptionDivisionFilterInput) {
		onCreateDivision(filter: $filter) {
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
export const onUpdateDivision = /* GraphQL */ `
	subscription OnUpdateDivision($filter: ModelSubscriptionDivisionFilterInput) {
		onUpdateDivision(filter: $filter) {
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
export const onDeleteDivision = /* GraphQL */ `
	subscription OnDeleteDivision($filter: ModelSubscriptionDivisionFilterInput) {
		onDeleteDivision(filter: $filter) {
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
export const onCreateSeason = /* GraphQL */ `
	subscription OnCreateSeason($filter: ModelSubscriptionSeasonFilterInput) {
		onCreateSeason(filter: $filter) {
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
export const onUpdateSeason = /* GraphQL */ `
	subscription OnUpdateSeason($filter: ModelSubscriptionSeasonFilterInput) {
		onUpdateSeason(filter: $filter) {
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
export const onDeleteSeason = /* GraphQL */ `
	subscription OnDeleteSeason($filter: ModelSubscriptionSeasonFilterInput) {
		onDeleteSeason(filter: $filter) {
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
export const onCreateLeague = /* GraphQL */ `
	subscription OnCreateLeague($filter: ModelSubscriptionLeagueFilterInput) {
		onCreateLeague(filter: $filter) {
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
export const onUpdateLeague = /* GraphQL */ `
	subscription OnUpdateLeague($filter: ModelSubscriptionLeagueFilterInput) {
		onUpdateLeague(filter: $filter) {
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
export const onDeleteLeague = /* GraphQL */ `
	subscription OnDeleteLeague($filter: ModelSubscriptionLeagueFilterInput) {
		onDeleteLeague(filter: $filter) {
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
export const onCreateTeamNote = /* GraphQL */ `
	subscription OnCreateTeamNote($filter: ModelSubscriptionTeamNoteFilterInput) {
		onCreateTeamNote(filter: $filter) {
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
export const onUpdateTeamNote = /* GraphQL */ `
	subscription OnUpdateTeamNote($filter: ModelSubscriptionTeamNoteFilterInput) {
		onUpdateTeamNote(filter: $filter) {
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
export const onDeleteTeamNote = /* GraphQL */ `
	subscription OnDeleteTeamNote($filter: ModelSubscriptionTeamNoteFilterInput) {
		onDeleteTeamNote(filter: $filter) {
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
export const onCreateTeam = /* GraphQL */ `
	subscription OnCreateTeam($filter: ModelSubscriptionTeamFilterInput) {
		onCreateTeam(filter: $filter) {
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
export const onUpdateTeam = /* GraphQL */ `
	subscription OnUpdateTeam($filter: ModelSubscriptionTeamFilterInput) {
		onUpdateTeam(filter: $filter) {
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
export const onDeleteTeam = /* GraphQL */ `
	subscription OnDeleteTeam($filter: ModelSubscriptionTeamFilterInput) {
		onDeleteTeam(filter: $filter) {
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
export const onCreatePlayerNote = /* GraphQL */ `
	subscription OnCreatePlayerNote(
		$filter: ModelSubscriptionPlayerNoteFilterInput
	) {
		onCreatePlayerNote(filter: $filter) {
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
export const onUpdatePlayerNote = /* GraphQL */ `
	subscription OnUpdatePlayerNote(
		$filter: ModelSubscriptionPlayerNoteFilterInput
	) {
		onUpdatePlayerNote(filter: $filter) {
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
export const onDeletePlayerNote = /* GraphQL */ `
	subscription OnDeletePlayerNote(
		$filter: ModelSubscriptionPlayerNoteFilterInput
	) {
		onDeletePlayerNote(filter: $filter) {
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
export const onCreateDivisionTeam = /* GraphQL */ `
	subscription OnCreateDivisionTeam(
		$filter: ModelSubscriptionDivisionTeamFilterInput
	) {
		onCreateDivisionTeam(filter: $filter) {
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
export const onUpdateDivisionTeam = /* GraphQL */ `
	subscription OnUpdateDivisionTeam(
		$filter: ModelSubscriptionDivisionTeamFilterInput
	) {
		onUpdateDivisionTeam(filter: $filter) {
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
export const onDeleteDivisionTeam = /* GraphQL */ `
	subscription OnDeleteDivisionTeam(
		$filter: ModelSubscriptionDivisionTeamFilterInput
	) {
		onDeleteDivisionTeam(filter: $filter) {
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
