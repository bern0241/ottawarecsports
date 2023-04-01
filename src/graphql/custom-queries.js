/**
 * Last updated: 2023-04-01
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