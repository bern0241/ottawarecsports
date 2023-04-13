/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { API, graphqlOperation } from 'aws-amplify';

export const listLeaguesLong = /* GraphQL */ `
	query ListLeagues(
		$filter: ModelLeagueFilterInput
		$limit: Int
		$nextToken: String
	) {
		listLeagues(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				name
				sport
				date_founded
				description
				time_per_period
				number_of_periods
				cost_per_individual
				cost_per_team
				coordinators
				createdAt
				updatedAt
				Seasons {
					items {
						id
						name
						league
						is_completed
						end_date
						createdAt
						abbreviation
						start_date
						updatedAt
						Divisions {
							items {
								name
								id
								level
								is_playoff
								season
								teams
								updatedAt
								description
								createdAt
								abbreviation
								Games {
									items {
										away_roster
										id
										location
										referees
										round
										status
										updatedAt
										home_score
										home_roster
										goals
										gameHomeTeamId
										gameAwayTeamId
										division
										date
										createdAt
										away_score
									}
								}
								Teams {
									items {
										id
										teamId
										updatedAt
										divisionId
										createdAt
									}
								}
							}
						}
					}
				}
			}
			nextToken
		}
	}
`;

export const getDivisionWithTeams = /* GraphQL */ `
	query GetDivision($id: ID!) {
		getDivision(id: $id) {
			id
			name
			level
			season
			teams
			updatedAt
			is_playoff
			description
			createdAt
			abbreviation
			Teams {
				items {
					teamId
					updatedAt
					id
					divisionId
					createdAt
				}
			}
			Games {
				items {
					away_roster
					away_score
					createdAt
					date
					division
					gameAwayTeamId
					gameHomeTeamId
					goals
					updatedAt
					status
					round
					location
					referees
					id
					home_score
					home_roster
				}
			}
		}
	}
`;


export const getGamesByTeam = /* Graph QL */ `
 query MyQuery($teamId: ID!) {
  listGames(filter: {
    and: [
		{
		  status: {eq: NOT_STARTED}
		},
		{
		  or: [
			{ gameHomeTeamId: { eq: $teamId } },
			{ gameAwayTeamId: { eq: $teamId } }
		  ]
		}
	  ]
  }) {
    items {
      id
      date
      gameHomeTeamId
      gameAwayTeamId
    }
  }
}
`;


// MADE THIS WITH GREG - ALSO USED IN LEAGUES PAGE (admin portal)
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

// MEANT FOR SCHEDULE PAGE
export const getSeasonShort = /* GraphQL */ `
  query GetSeason($id: ID!) {
    getSeason(id: $id) {
		id
    is_completed
    league
    name
    start_date
    updatedAt
    end_date
    createdAt
    abbreviation
    Divisions {
      items {
        updatedAt
        teams
        season
        name
        level
        is_playoff
        id
        description
        createdAt
        abbreviation
      }
    }
    }
  }
`;

export const getDivisionShort = /* GraphQL */ `
  query GetDivision($id: ID!) {
    getDivision(id: $id) {
		abbreviation
    createdAt
    description
    id
    is_playoff
    level
    name
    season
    teams
    updatedAt
    }
  }
`;

export const listTeamDivisionsShort = /* GraphQL */ `
  query ListTeamDivisions(
    $filter: ModelTeamDivisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
	items {
      divisionId
      teamId
      id
      updatedAt
      createdAt
      team {
		name
        away_colour
        captains
        createdAt
        founded
        home_colour
		team_picture
		Divisions {
        items {
          createdAt
          divisionId
          id
          teamId
          updatedAt
        }
      }
		Players {
              items {
                id
                user_id
                teamID
                role
                createdAt
                updatedAt
              }
              nextToken
            }
		captains
		sport
		name
        id
      }
      division {
        abbreviation
        createdAt
        description
        id
        is_playoff
        level
        name
        season
        teams
        updatedAt
      }
    }
      nextToken
    }
  }
`;

// export const createTeamDivisionShort = /* GraphQL */ `
//   mutation CreateTeamDivision(
//     $input: CreateTeamDivisionInput!
//     $condition: ModelTeamDivisionConditionInput
//   ) {
//     createTeamDivision(input: $input, condition: $condition) {
// 	team {
//       captains
//       id
//       name
//       sport
//       home_colour
//       away_colour
//       founded
//       Players {
//         items {
//           id
//           role
//           teamID
//           updatedAt
//           user_id
//           createdAt
//         }
//       }
//     }
//     teamId
//     divisionId
// 	}
//   }
// `;

export const listTeamsShort = /* GraphQL */ `
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
      sport
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
          divisionId
          id
          createdAt
          teamId
          updatedAt
        }
      }
    }
    }
  }
`;

export const listGamesShort = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
		items {
      away_color
      away_roster
      createdAt
      away_score
      date
      division
      gameAwayTeamId
      gameHomeTeamId
      goals
      home_color
      home_roster
      home_score
      id
      location
      referees
      round
      status
      updatedAt
      AwayTeam {
        away_colour
        captains
        createdAt
        founded
        home_colour
        id
        name
        sport
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
        team_history
      }
      HomeTeam {
        away_colour
        captains
        createdAt
        founded
        home_colour
        id
        name
        sport
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
        team_history
      }
		}
    }
  }
`;

export const createGameShort = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
    # createGame(input: $input, condition: $condition) {
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
        TeamNotes {
          items {
            id
            date
            description
            team_id
            author_id
            createdAt
            updatedAt
          }
          nextToken
        }
        team_history
        team_picture
        Divisions {
          items {
            id
            divisionId
            teamId
            division {
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
            team {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        Players {
          items {
            id
            user_id
            soccer_stats {
              id
              teamid
              division
              position
              goals
              assists
              yellow_cards
              red_cards
              games_played
            }
            teamID
            role
            createdAt
            updatedAt
          }
          nextToken
        }
        captains
        sport
        createdAt
        updatedAt
      }
      AwayTeam {
        id
        name
        founded
        home_colour
        away_colour
        TeamNotes {
          items {
            id
            date
            description
            team_id
            author_id
            createdAt
            updatedAt
          }
          nextToken
        }
        team_history
        team_picture
        Divisions {
          items {
            id
            divisionId
            teamId
            division {
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
            team {
              id
              name
              founded
              home_colour
              away_colour
              TeamNotes {
                nextToken
              }
              team_history
              team_picture
              Divisions {
                nextToken
              }
              Players {
                nextToken
              }
              captains
              sport
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        Players {
          items {
            id
            user_id
            soccer_stats {
              id
              teamid
              division
              position
              goals
              assists
              yellow_cards
              red_cards
              games_played
            }
            teamID
            role
            createdAt
            updatedAt
          }
          nextToken
        }
        captains
        sport
        createdAt
        updatedAt
      }
      home_color
      away_color
      createdAt
      updatedAt
      gameHomeTeamId
      gameAwayTeamId
    }
  }
`;

export const getTeamShort = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      away_colour
    captains
    createdAt
    founded
    home_colour
    id
    name
    sport
    updatedAt
    team_picture
    Divisions {
      items {
        createdAt
        divisionId
        id
        teamId
        updatedAt
      }
    }
    Players {
      items {
        createdAt
        id
        role
        teamID
        user_id
        updatedAt
      }
    }
    }
  }
`;


export const listDivisionsShort = /* GraphQL */ `
  query ListDivisions(
    $filter: ModelDivisionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
      abbreviation
      createdAt
      description
      is_playoff
      id
      level
      season
      name
      teams
      updatedAt
      Teams {
        items {
          createdAt
          divisionId
          id
          teamId
          updatedAt
        }
      }
      Games {
        items
      }
    }
      nextToken
    }
  }
`;