import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum GameStatusEnum {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  CANCELLED = "CANCELLED",
  SUBMITTED = "SUBMITTED",
  FINISHED = "FINISHED"
}

export enum DivisionsEnum {
  D = "D",
  C = "C",
  B = "B",
  A = "A",
  AA = "AA",
  AAA = "AAA"
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

type EagerTeamDivisionStats = {
  readonly id?: string | null;
  readonly team?: string | null;
  readonly division?: string | null;
  readonly roster?: (string | null)[] | null;
  readonly goals?: number | null;
  readonly assists?: number | null;
  readonly yellow_cards?: number | null;
  readonly red_cards?: number | null;
  readonly games_played?: number | null;
  readonly captains?: (string | null)[] | null;
}

type LazyTeamDivisionStats = {
  readonly id?: string | null;
  readonly team?: string | null;
  readonly division?: string | null;
  readonly roster?: (string | null)[] | null;
  readonly goals?: number | null;
  readonly assists?: number | null;
  readonly yellow_cards?: number | null;
  readonly red_cards?: number | null;
  readonly games_played?: number | null;
  readonly captains?: (string | null)[] | null;
}

export declare type TeamDivisionStats = LazyLoading extends LazyLoadingDisabled ? EagerTeamDivisionStats : LazyTeamDivisionStats

export declare const TeamDivisionStats: (new (init: ModelInit<TeamDivisionStats>) => TeamDivisionStats)

type EagerPlayerDivisionStats = {
  readonly id?: string | null;
  readonly team?: string | null;
  readonly division?: string | null;
  readonly position?: string | null;
  readonly goals?: number | null;
  readonly assists?: number | null;
  readonly yellow_cards?: number | null;
  readonly red_cards?: number | null;
  readonly games_played?: number | null;
}

type LazyPlayerDivisionStats = {
  readonly id?: string | null;
  readonly team?: string | null;
  readonly division?: string | null;
  readonly position?: string | null;
  readonly goals?: number | null;
  readonly assists?: number | null;
  readonly yellow_cards?: number | null;
  readonly red_cards?: number | null;
  readonly games_played?: number | null;
}

export declare type PlayerDivisionStats = LazyLoading extends LazyLoadingDisabled ? EagerPlayerDivisionStats : LazyPlayerDivisionStats

export declare const PlayerDivisionStats: (new (init: ModelInit<PlayerDivisionStats>) => PlayerDivisionStats)

type EagerPlayersSoccer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayersSoccer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly position?: string | null;
  readonly PlayerDivisionStats?: (PlayerDivisionStats | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlayersSoccer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayersSoccer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: string | null;
  readonly position?: string | null;
  readonly PlayerDivisionStats?: (PlayerDivisionStats | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PlayersSoccer = LazyLoading extends LazyLoadingDisabled ? EagerPlayersSoccer : LazyPlayersSoccer

export declare const PlayersSoccer: (new (init: ModelInit<PlayersSoccer>) => PlayersSoccer) & {
  copyOf(source: PlayersSoccer, mutator: (draft: MutableModel<PlayersSoccer>) => MutableModel<PlayersSoccer> | void): PlayersSoccer;
}

type EagerGames = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Games, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly division: string;
  readonly date?: number | null;
  readonly location?: string | null;
  readonly home_team?: string | null;
  readonly away_team?: string | null;
  readonly status?: GameStatusEnum | keyof typeof GameStatusEnum | null;
  readonly home_roster?: (string | null)[] | null;
  readonly away_roster?: (string | null)[] | null;
  readonly home_score?: number | null;
  readonly away_score?: number | null;
  readonly goals?: (string | null)[] | null;
  readonly round?: number | null;
  readonly referees?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGames = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Games, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly division: string;
  readonly date?: number | null;
  readonly location?: string | null;
  readonly home_team?: string | null;
  readonly away_team?: string | null;
  readonly status?: GameStatusEnum | keyof typeof GameStatusEnum | null;
  readonly home_roster?: (string | null)[] | null;
  readonly away_roster?: (string | null)[] | null;
  readonly home_score?: number | null;
  readonly away_score?: number | null;
  readonly goals?: (string | null)[] | null;
  readonly round?: number | null;
  readonly referees?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Games = LazyLoading extends LazyLoadingDisabled ? EagerGames : LazyGames

export declare const Games: (new (init: ModelInit<Games>) => Games) & {
  copyOf(source: Games, mutator: (draft: MutableModel<Games>) => MutableModel<Games> | void): Games;
}

type EagerDivisions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Divisions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly teams?: (string | null)[] | null;
  readonly next_round?: number | null;
  readonly season: string;
  readonly Games?: (Games | null)[] | null;
  readonly number_of_periods?: number | null;
  readonly time_per_period?: number | null;
  readonly level?: DivisionsEnum | keyof typeof DivisionsEnum | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDivisions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Divisions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly teams?: (string | null)[] | null;
  readonly next_round?: number | null;
  readonly season: string;
  readonly Games: AsyncCollection<Games>;
  readonly number_of_periods?: number | null;
  readonly time_per_period?: number | null;
  readonly level?: DivisionsEnum | keyof typeof DivisionsEnum | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Divisions = LazyLoading extends LazyLoadingDisabled ? EagerDivisions : LazyDivisions

export declare const Divisions: (new (init: ModelInit<Divisions>) => Divisions) & {
  copyOf(source: Divisions, mutator: (draft: MutableModel<Divisions>) => MutableModel<Divisions> | void): Divisions;
}

type EagerSeasons = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Seasons, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly league: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly start_date?: number | null;
  readonly end_date?: number | null;
  readonly Divisions?: (Divisions | null)[] | null;
  readonly is_completed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySeasons = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Seasons, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly league: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly start_date?: number | null;
  readonly end_date?: number | null;
  readonly Divisions: AsyncCollection<Divisions>;
  readonly is_completed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Seasons = LazyLoading extends LazyLoadingDisabled ? EagerSeasons : LazySeasons

export declare const Seasons: (new (init: ModelInit<Seasons>) => Seasons) & {
  copyOf(source: Seasons, mutator: (draft: MutableModel<Seasons>) => MutableModel<Seasons> | void): Seasons;
}

type EagerLeagues = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Leagues, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly sport?: string | null;
  readonly date_founded?: number | null;
  readonly gender?: GenderEnum | keyof typeof GenderEnum | null;
  readonly cost_per_individual?: number | null;
  readonly cost_per_team?: number | null;
  readonly coordinator?: (string | null)[] | null;
  readonly Seasons?: (Seasons | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLeagues = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Leagues, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly sport?: string | null;
  readonly date_founded?: number | null;
  readonly gender?: GenderEnum | keyof typeof GenderEnum | null;
  readonly cost_per_individual?: number | null;
  readonly cost_per_team?: number | null;
  readonly coordinator?: (string | null)[] | null;
  readonly Seasons: AsyncCollection<Seasons>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Leagues = LazyLoading extends LazyLoadingDisabled ? EagerLeagues : LazyLeagues

export declare const Leagues: (new (init: ModelInit<Leagues>) => Leagues) & {
  copyOf(source: Leagues, mutator: (draft: MutableModel<Leagues>) => MutableModel<Leagues> | void): Leagues;
}

type EagerTeamNotes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamNotes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: number | null;
  readonly description?: string | null;
  readonly team: string;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeamNotes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamNotes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: number | null;
  readonly description?: string | null;
  readonly team: string;
  readonly author?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TeamNotes = LazyLoading extends LazyLoadingDisabled ? EagerTeamNotes : LazyTeamNotes

export declare const TeamNotes: (new (init: ModelInit<TeamNotes>) => TeamNotes) & {
  copyOf(source: TeamNotes, mutator: (draft: MutableModel<TeamNotes>) => MutableModel<TeamNotes> | void): TeamNotes;
}

type EagerTeams = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Teams, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly founded?: number | null;
  readonly home_colour?: string | null;
  readonly away_colour?: string | null;
  readonly TeamNotes?: (TeamNotes | null)[] | null;
  readonly team_history?: (TeamDivisionStats | null)[] | null;
  readonly team_picture?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeams = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Teams, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly founded?: number | null;
  readonly home_colour?: string | null;
  readonly away_colour?: string | null;
  readonly TeamNotes: AsyncCollection<TeamNotes>;
  readonly team_history?: (TeamDivisionStats | null)[] | null;
  readonly team_picture?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Teams = LazyLoading extends LazyLoadingDisabled ? EagerTeams : LazyTeams

export declare const Teams: (new (init: ModelInit<Teams>) => Teams) & {
  copyOf(source: Teams, mutator: (draft: MutableModel<Teams>) => MutableModel<Teams> | void): Teams;
}

type EagerUserNotes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserNotes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user: string;
  readonly author?: string | null;
  readonly date?: number | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserNotes = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserNotes, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user: string;
  readonly author?: string | null;
  readonly date?: number | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserNotes = LazyLoading extends LazyLoadingDisabled ? EagerUserNotes : LazyUserNotes

export declare const UserNotes: (new (init: ModelInit<UserNotes>) => UserNotes) & {
  copyOf(source: UserNotes, mutator: (draft: MutableModel<UserNotes>) => MutableModel<UserNotes> | void): UserNotes;
}

type EagerUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly email?: string | null;
  readonly gender?: GenderEnum | keyof typeof GenderEnum | null;
  readonly date_of_birth?: number | null;
  readonly UserNotes?: (UserNotes | null)[] | null;
  readonly PlayersSoccer?: PlayersSoccer | null;
  readonly profile_picture?: string | null;
  readonly username?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly usersPlayersSoccerId?: string | null;
}

type LazyUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly first_name?: string | null;
  readonly last_name?: string | null;
  readonly email?: string | null;
  readonly gender?: GenderEnum | keyof typeof GenderEnum | null;
  readonly date_of_birth?: number | null;
  readonly UserNotes: AsyncCollection<UserNotes>;
  readonly PlayersSoccer: AsyncItem<PlayersSoccer | undefined>;
  readonly profile_picture?: string | null;
  readonly username?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly usersPlayersSoccerId?: string | null;
}

export declare type Users = LazyLoading extends LazyLoadingDisabled ? EagerUsers : LazyUsers

export declare const Users: (new (init: ModelInit<Users>) => Users) & {
  copyOf(source: Users, mutator: (draft: MutableModel<Users>) => MutableModel<Users> | void): Users;
}