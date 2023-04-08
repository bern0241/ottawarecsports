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
    nextToken
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