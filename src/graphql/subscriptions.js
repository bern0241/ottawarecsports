/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlayersSoccer = /* GraphQL */ `
  subscription OnCreatePlayersSoccer(
    $filter: ModelSubscriptionPlayersSoccerFilterInput
  ) {
    onCreatePlayersSoccer(filter: $filter) {
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
export const onUpdatePlayersSoccer = /* GraphQL */ `
  subscription OnUpdatePlayersSoccer(
    $filter: ModelSubscriptionPlayersSoccerFilterInput
  ) {
    onUpdatePlayersSoccer(filter: $filter) {
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
export const onDeletePlayersSoccer = /* GraphQL */ `
  subscription OnDeletePlayersSoccer(
    $filter: ModelSubscriptionPlayersSoccerFilterInput
  ) {
    onDeletePlayersSoccer(filter: $filter) {
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
export const onCreateGames = /* GraphQL */ `
  subscription OnCreateGames($filter: ModelSubscriptionGamesFilterInput) {
    onCreateGames(filter: $filter) {
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
export const onUpdateGames = /* GraphQL */ `
  subscription OnUpdateGames($filter: ModelSubscriptionGamesFilterInput) {
    onUpdateGames(filter: $filter) {
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
export const onDeleteGames = /* GraphQL */ `
  subscription OnDeleteGames($filter: ModelSubscriptionGamesFilterInput) {
    onDeleteGames(filter: $filter) {
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
export const onCreateDivisions = /* GraphQL */ `
  subscription OnCreateDivisions(
    $filter: ModelSubscriptionDivisionsFilterInput
  ) {
    onCreateDivisions(filter: $filter) {
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
export const onUpdateDivisions = /* GraphQL */ `
  subscription OnUpdateDivisions(
    $filter: ModelSubscriptionDivisionsFilterInput
  ) {
    onUpdateDivisions(filter: $filter) {
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
export const onDeleteDivisions = /* GraphQL */ `
  subscription OnDeleteDivisions(
    $filter: ModelSubscriptionDivisionsFilterInput
  ) {
    onDeleteDivisions(filter: $filter) {
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
export const onCreateSeasons = /* GraphQL */ `
  subscription OnCreateSeasons($filter: ModelSubscriptionSeasonsFilterInput) {
    onCreateSeasons(filter: $filter) {
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
export const onUpdateSeasons = /* GraphQL */ `
  subscription OnUpdateSeasons($filter: ModelSubscriptionSeasonsFilterInput) {
    onUpdateSeasons(filter: $filter) {
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
export const onDeleteSeasons = /* GraphQL */ `
  subscription OnDeleteSeasons($filter: ModelSubscriptionSeasonsFilterInput) {
    onDeleteSeasons(filter: $filter) {
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
export const onCreateLeagues = /* GraphQL */ `
  subscription OnCreateLeagues($filter: ModelSubscriptionLeaguesFilterInput) {
    onCreateLeagues(filter: $filter) {
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
export const onUpdateLeagues = /* GraphQL */ `
  subscription OnUpdateLeagues($filter: ModelSubscriptionLeaguesFilterInput) {
    onUpdateLeagues(filter: $filter) {
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
export const onDeleteLeagues = /* GraphQL */ `
  subscription OnDeleteLeagues($filter: ModelSubscriptionLeaguesFilterInput) {
    onDeleteLeagues(filter: $filter) {
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
export const onCreateTeamNotes = /* GraphQL */ `
  subscription OnCreateTeamNotes(
    $filter: ModelSubscriptionTeamNotesFilterInput
  ) {
    onCreateTeamNotes(filter: $filter) {
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
export const onUpdateTeamNotes = /* GraphQL */ `
  subscription OnUpdateTeamNotes(
    $filter: ModelSubscriptionTeamNotesFilterInput
  ) {
    onUpdateTeamNotes(filter: $filter) {
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
export const onDeleteTeamNotes = /* GraphQL */ `
  subscription OnDeleteTeamNotes(
    $filter: ModelSubscriptionTeamNotesFilterInput
  ) {
    onDeleteTeamNotes(filter: $filter) {
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
export const onCreateTeams = /* GraphQL */ `
  subscription OnCreateTeams($filter: ModelSubscriptionTeamsFilterInput) {
    onCreateTeams(filter: $filter) {
      id
      name
      founded
      home_colour
      away_colou
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
export const onUpdateTeams = /* GraphQL */ `
  subscription OnUpdateTeams($filter: ModelSubscriptionTeamsFilterInput) {
    onUpdateTeams(filter: $filter) {
      id
      name
      founded
      home_colour
      away_colou
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
export const onDeleteTeams = /* GraphQL */ `
  subscription OnDeleteTeams($filter: ModelSubscriptionTeamsFilterInput) {
    onDeleteTeams(filter: $filter) {
      id
      name
      founded
      home_colour
      away_colou
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
export const onCreateUserNotes = /* GraphQL */ `
  subscription OnCreateUserNotes(
    $filter: ModelSubscriptionUserNotesFilterInput
  ) {
    onCreateUserNotes(filter: $filter) {
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
export const onUpdateUserNotes = /* GraphQL */ `
  subscription OnUpdateUserNotes(
    $filter: ModelSubscriptionUserNotesFilterInput
  ) {
    onUpdateUserNotes(filter: $filter) {
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
export const onDeleteUserNotes = /* GraphQL */ `
  subscription OnDeleteUserNotes(
    $filter: ModelSubscriptionUserNotesFilterInput
  ) {
    onDeleteUserNotes(filter: $filter) {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
