/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlayersSoccer = /* GraphQL */ `
  query GetPlayersSoccer($id: ID!) {
    getPlayersSoccer(id: $id) {
      id
      user
      position
      PlayerDivisionStats {
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
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listPlayersSoccers = /* GraphQL */ `
  query ListPlayersSoccers(
    $filter: ModelPlayersSoccerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayersSoccers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        position
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPlayersSoccers = /* GraphQL */ `
  query SyncPlayersSoccers(
    $filter: ModelPlayersSoccerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPlayersSoccers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        user
        position
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getGames = /* GraphQL */ `
  query GetGames($id: ID!) {
    getGames(id: $id) {
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
      goals
      round
      referees
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        goals
        round
        referees
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncGames = /* GraphQL */ `
  query SyncGames(
    $filter: ModelGamesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGames(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        goals
        round
        referees
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const gamesByDivision = /* GraphQL */ `
  query GamesByDivision(
    $division: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gamesByDivision(
      division: $division
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        goals
        round
        referees
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getDivisions = /* GraphQL */ `
  query GetDivisions($id: ID!) {
    getDivisions(id: $id) {
      id
      name
      abbreviation
      teams
      next_round
      season
      Games {
        nextToken
        startedAt
      }
      number_of_periods
      time_per_period
      level
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listDivisions = /* GraphQL */ `
  query ListDivisions(
    $filter: ModelDivisionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDivisions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        abbreviation
        teams
        next_round
        season
        number_of_periods
        time_per_period
        level
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDivisions = /* GraphQL */ `
  query SyncDivisions(
    $filter: ModelDivisionsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDivisions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        abbreviation
        teams
        next_round
        season
        number_of_periods
        time_per_period
        level
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const divisionsBySeason = /* GraphQL */ `
  query DivisionsBySeason(
    $season: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDivisionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    divisionsBySeason(
      season: $season
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        abbreviation
        teams
        next_round
        season
        number_of_periods
        time_per_period
        level
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSeasons = /* GraphQL */ `
  query GetSeasons($id: ID!) {
    getSeasons(id: $id) {
      id
      league
      name
      abbreviation
      start_date
      end_date
      Divisions {
        nextToken
        startedAt
      }
      is_completed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSeasons = /* GraphQL */ `
  query ListSeasons(
    $filter: ModelSeasonsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeasons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        league
        name
        abbreviation
        start_date
        end_date
        is_completed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSeasons = /* GraphQL */ `
  query SyncSeasons(
    $filter: ModelSeasonsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSeasons(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        league
        name
        abbreviation
        start_date
        end_date
        is_completed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const seasonsByLeague = /* GraphQL */ `
  query SeasonsByLeague(
    $league: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSeasonsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    seasonsByLeague(
      league: $league
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        league
        name
        abbreviation
        start_date
        end_date
        is_completed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getLeagues = /* GraphQL */ `
  query GetLeagues($id: ID!) {
    getLeagues(id: $id) {
      id
      name
      sport
      date_founded
      gender
      cost_per_individual
      cost_per_team
      coordinator
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
export const listLeagues = /* GraphQL */ `
  query ListLeagues(
    $filter: ModelLeaguesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeagues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        sport
        date_founded
        gender
        cost_per_individual
        cost_per_team
        coordinator
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLeagues = /* GraphQL */ `
  query SyncLeagues(
    $filter: ModelLeaguesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLeagues(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        sport
        date_founded
        gender
        cost_per_individual
        cost_per_team
        coordinator
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTeamNotes = /* GraphQL */ `
  query GetTeamNotes($id: ID!) {
    getTeamNotes(id: $id) {
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
export const listTeamNotes = /* GraphQL */ `
  query ListTeamNotes(
    $filter: ModelTeamNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncTeamNotes = /* GraphQL */ `
  query SyncTeamNotes(
    $filter: ModelTeamNotesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTeamNotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const teamNotesByTeam = /* GraphQL */ `
  query TeamNotesByTeam(
    $team: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTeamNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamNotesByTeam(
      team: $team
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getTeams = /* GraphQL */ `
  query GetTeams($id: ID!) {
    getTeams(id: $id) {
      id
      name
      founded
      home_colour
      away_colour
      TeamNotes {
        nextToken
        startedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        founded
        home_colour
        away_colour
        team_picture
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTeams = /* GraphQL */ `
  query SyncTeams(
    $filter: ModelTeamsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTeams(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        founded
        home_colour
        away_colour
        team_picture
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserNotes = /* GraphQL */ `
  query GetUserNotes($id: ID!) {
    getUserNotes(id: $id) {
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
export const listUserNotes = /* GraphQL */ `
  query ListUserNotes(
    $filter: ModelUserNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUserNotes = /* GraphQL */ `
  query SyncUserNotes(
    $filter: ModelUserNotesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserNotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const userNotesByUser = /* GraphQL */ `
  query UserNotesByUser(
    $user: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userNotesByUser(
      user: $user
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
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
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      profile_picture
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      usersPlayersSoccerId
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_name
        email
        gender
        date_of_birth
        profile_picture
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        usersPlayersSoccerId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        first_name
        last_name
        email
        gender
        date_of_birth
        profile_picture
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        usersPlayersSoccerId
      }
      nextToken
      startedAt
    }
  }
`;
