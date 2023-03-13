/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlayersSoccer = /* GraphQL */ `
  mutation CreatePlayersSoccer(
    $input: CreatePlayersSoccerInput!
    $condition: ModelPlayersSoccerConditionInput
  ) {
    createPlayersSoccer(input: $input, condition: $condition) {
      id
      user
      position
      goals
      assists
      yellow_cards
      red_cards
      roles
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePlayersSoccer = /* GraphQL */ `
  mutation UpdatePlayersSoccer(
    $input: UpdatePlayersSoccerInput!
    $condition: ModelPlayersSoccerConditionInput
  ) {
    updatePlayersSoccer(input: $input, condition: $condition) {
      id
      user
      position
      goals
      assists
      yellow_cards
      red_cards
      roles
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePlayersSoccer = /* GraphQL */ `
  mutation DeletePlayersSoccer(
    $input: DeletePlayersSoccerInput!
    $condition: ModelPlayersSoccerConditionInput
  ) {
    deletePlayersSoccer(input: $input, condition: $condition) {
      id
      user
      position
      goals
      assists
      yellow_cards
      red_cards
      roles
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createGames = /* GraphQL */ `
  mutation CreateGames(
    $input: CreateGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    createGames(input: $input, condition: $condition) {
      id
      division
      date
      location
      home_team
      away_team
      status
      home_roster
      away_roster
      home_score
      away_score
      season
      year
      goals
      round
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateGames = /* GraphQL */ `
  mutation UpdateGames(
    $input: UpdateGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    updateGames(input: $input, condition: $condition) {
      id
      division
      date
      location
      home_team
      away_team
      status
      home_roster
      away_roster
      home_score
      away_score
      season
      year
      goals
      round
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteGames = /* GraphQL */ `
  mutation DeleteGames(
    $input: DeleteGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    deleteGames(input: $input, condition: $condition) {
      id
      division
      date
      location
      home_team
      away_team
      status
      home_roster
      away_roster
      home_score
      away_score
      season
      year
      goals
      round
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createDivisions = /* GraphQL */ `
  mutation CreateDivisions(
    $input: CreateDivisionsInput!
    $condition: ModelDivisionsConditionInput
  ) {
    createDivisions(input: $input, condition: $condition) {
      id
      name
      abbreviation
      level
      next_round
      season
      Games {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateDivisions = /* GraphQL */ `
  mutation UpdateDivisions(
    $input: UpdateDivisionsInput!
    $condition: ModelDivisionsConditionInput
  ) {
    updateDivisions(input: $input, condition: $condition) {
      id
      name
      abbreviation
      level
      next_round
      season
      Games {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteDivisions = /* GraphQL */ `
  mutation DeleteDivisions(
    $input: DeleteDivisionsInput!
    $condition: ModelDivisionsConditionInput
  ) {
    deleteDivisions(input: $input, condition: $condition) {
      id
      name
      abbreviation
      level
      next_round
      season
      Games {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSeasons = /* GraphQL */ `
  mutation CreateSeasons(
    $input: CreateSeasonsInput!
    $condition: ModelSeasonsConditionInput
  ) {
    createSeasons(input: $input, condition: $condition) {
      id
      league
      name
      abbreviation
      start_date
      end_date
      number_of_periods
      time_per_period
      Divisions {
        nextToken
        startedAt
      }
      Games {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSeasons = /* GraphQL */ `
  mutation UpdateSeasons(
    $input: UpdateSeasonsInput!
    $condition: ModelSeasonsConditionInput
  ) {
    updateSeasons(input: $input, condition: $condition) {
      id
      league
      name
      abbreviation
      start_date
      end_date
      number_of_periods
      time_per_period
      Divisions {
        nextToken
        startedAt
      }
      Games {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSeasons = /* GraphQL */ `
  mutation DeleteSeasons(
    $input: DeleteSeasonsInput!
    $condition: ModelSeasonsConditionInput
  ) {
    deleteSeasons(input: $input, condition: $condition) {
      id
      league
      name
      abbreviation
      start_date
      end_date
      number_of_periods
      time_per_period
      Divisions {
        nextToken
        startedAt
      }
      Games {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createLeagues = /* GraphQL */ `
  mutation CreateLeagues(
    $input: CreateLeaguesInput!
    $condition: ModelLeaguesConditionInput
  ) {
    createLeagues(input: $input, condition: $condition) {
      id
      name
      sport
      date_founded
      gender
      cost_per_individual
      cost_per_team
      coordinator
      isCompleted
      Seasons {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateLeagues = /* GraphQL */ `
  mutation UpdateLeagues(
    $input: UpdateLeaguesInput!
    $condition: ModelLeaguesConditionInput
  ) {
    updateLeagues(input: $input, condition: $condition) {
      id
      name
      sport
      date_founded
      gender
      cost_per_individual
      cost_per_team
      coordinator
      isCompleted
      Seasons {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteLeagues = /* GraphQL */ `
  mutation DeleteLeagues(
    $input: DeleteLeaguesInput!
    $condition: ModelLeaguesConditionInput
  ) {
    deleteLeagues(input: $input, condition: $condition) {
      id
      name
      sport
      date_founded
      gender
      cost_per_individual
      cost_per_team
      coordinator
      isCompleted
      Seasons {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTeamNotes = /* GraphQL */ `
  mutation CreateTeamNotes(
    $input: CreateTeamNotesInput!
    $condition: ModelTeamNotesConditionInput
  ) {
    createTeamNotes(input: $input, condition: $condition) {
      id
      date
      description
      team
      author
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTeamNotes = /* GraphQL */ `
  mutation UpdateTeamNotes(
    $input: UpdateTeamNotesInput!
    $condition: ModelTeamNotesConditionInput
  ) {
    updateTeamNotes(input: $input, condition: $condition) {
      id
      date
      description
      team
      author
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTeamNotes = /* GraphQL */ `
  mutation DeleteTeamNotes(
    $input: DeleteTeamNotesInput!
    $condition: ModelTeamNotesConditionInput
  ) {
    deleteTeamNotes(input: $input, condition: $condition) {
      id
      date
      description
      team
      author
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTeams = /* GraphQL */ `
  mutation CreateTeams(
    $input: CreateTeamsInput!
    $condition: ModelTeamsConditionInput
  ) {
    createTeams(input: $input, condition: $condition) {
      id
      name
      founded
      home_colour
      away_colour
      division
      team_captain
      games_played
      TeamNotes {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTeams = /* GraphQL */ `
  mutation UpdateTeams(
    $input: UpdateTeamsInput!
    $condition: ModelTeamsConditionInput
  ) {
    updateTeams(input: $input, condition: $condition) {
      id
      name
      founded
      home_colour
      away_colour
      division
      team_captain
      games_played
      TeamNotes {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTeams = /* GraphQL */ `
  mutation DeleteTeams(
    $input: DeleteTeamsInput!
    $condition: ModelTeamsConditionInput
  ) {
    deleteTeams(input: $input, condition: $condition) {
      id
      name
      founded
      home_colour
      away_colour
      division
      team_captain
      games_played
      TeamNotes {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUserNotes = /* GraphQL */ `
  mutation CreateUserNotes(
    $input: CreateUserNotesInput!
    $condition: ModelUserNotesConditionInput
  ) {
    createUserNotes(input: $input, condition: $condition) {
      id
      user
      author
      date
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUserNotes = /* GraphQL */ `
  mutation UpdateUserNotes(
    $input: UpdateUserNotesInput!
    $condition: ModelUserNotesConditionInput
  ) {
    updateUserNotes(input: $input, condition: $condition) {
      id
      user
      author
      date
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUserNotes = /* GraphQL */ `
  mutation DeleteUserNotes(
    $input: DeleteUserNotesInput!
    $condition: ModelUserNotesConditionInput
  ) {
    deleteUserNotes(input: $input, condition: $condition) {
      id
      user
      author
      date
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
      first_name
      last_name
      email
      gender
      date_of_birth
      UserNotes {
        nextToken
        startedAt
      }
      PlayersSoccer {
        id
        user
        position
        goals
        assists
        yellow_cards
        red_cards
        roles
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      usersPlayersSoccerId
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      first_name
      last_name
      email
      gender
      date_of_birth
      UserNotes {
        nextToken
        startedAt
      }
      PlayersSoccer {
        id
        user
        position
        goals
        assists
        yellow_cards
        red_cards
        roles
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      usersPlayersSoccerId
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
      first_name
      last_name
      email
      gender
      date_of_birth
      UserNotes {
        nextToken
        startedAt
      }
      PlayersSoccer {
        id
        user
        position
        goals
        assists
        yellow_cards
        red_cards
        roles
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      usersPlayersSoccerId
    }
  }
`;
