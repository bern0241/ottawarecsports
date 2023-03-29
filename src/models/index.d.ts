import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

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

type EagerSoccerTeamStat = {
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

type LazySoccerTeamStat = {
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

export declare type SoccerTeamStat = LazyLoading extends LazyLoadingDisabled ? EagerSoccerTeamStat : LazySoccerTeamStat

export declare const SoccerTeamStat: (new (init: ModelInit<SoccerTeamStat>) => SoccerTeamStat)

type EagerSoccerDivisionStat = {
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

type LazySoccerDivisionStat = {
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

export declare type SoccerDivisionStat = LazyLoading extends LazyLoadingDisabled ? EagerSoccerDivisionStat : LazySoccerDivisionStat

export declare const SoccerDivisionStat: (new (init: ModelInit<SoccerDivisionStat>) => SoccerDivisionStat)

type EagerSportsmanshipPoint = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SportsmanshipPoint, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly points?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySportsmanshipPoint = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SportsmanshipPoint, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly points?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SportsmanshipPoint = LazyLoading extends LazyLoadingDisabled ? EagerSportsmanshipPoint : LazySportsmanshipPoint

export declare const SportsmanshipPoint: (new (init: ModelInit<SportsmanshipPoint>) => SportsmanshipPoint) & {
  copyOf(source: SportsmanshipPoint, mutator: (draft: MutableModel<SportsmanshipPoint>) => MutableModel<SportsmanshipPoint> | void): SportsmanshipPoint;
}

type EagerPlayer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Player, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_id?: string | null;
  readonly soccer_stats?: (SoccerDivisionStat | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlayer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Player, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_id?: string | null;
  readonly soccer_stats?: (SoccerDivisionStat | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Player = LazyLoading extends LazyLoadingDisabled ? EagerPlayer : LazyPlayer

export declare const Player: (new (init: ModelInit<Player>) => Player) & {
  copyOf(source: Player, mutator: (draft: MutableModel<Player>) => MutableModel<Player> | void): Player;
}

type EagerGame = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Game, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly division: string;
  readonly date?: string | null;
  readonly location?: string | null;
  readonly status?: GameStatusEnum | keyof typeof GameStatusEnum | null;
  readonly home_roster?: (string | null)[] | null;
  readonly away_roster?: (string | null)[] | null;
  readonly home_score?: number | null;
  readonly away_score?: number | null;
  readonly goals?: (string | null)[] | null;
  readonly round?: number | null;
  readonly referees?: (string | null)[] | null;
  readonly HomeTeam: Team;
  readonly AwayTeam: Team;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly gameHomeTeamId: string;
  readonly gameAwayTeamId: string;
}

type LazyGame = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Game, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly division: string;
  readonly date?: string | null;
  readonly location?: string | null;
  readonly status?: GameStatusEnum | keyof typeof GameStatusEnum | null;
  readonly home_roster?: (string | null)[] | null;
  readonly away_roster?: (string | null)[] | null;
  readonly home_score?: number | null;
  readonly away_score?: number | null;
  readonly goals?: (string | null)[] | null;
  readonly round?: number | null;
  readonly referees?: (string | null)[] | null;
  readonly HomeTeam: AsyncItem<Team>;
  readonly AwayTeam: AsyncItem<Team>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly gameHomeTeamId: string;
  readonly gameAwayTeamId: string;
}

export declare type Game = LazyLoading extends LazyLoadingDisabled ? EagerGame : LazyGame

export declare const Game: (new (init: ModelInit<Game>) => Game) & {
  copyOf(source: Game, mutator: (draft: MutableModel<Game>) => MutableModel<Game> | void): Game;
}

type EagerTeam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Team, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly founded?: string | null;
  readonly home_colour?: string | null;
  readonly away_colour?: string | null;
  readonly TeamNotes?: (TeamNote | null)[] | null;
  readonly team_history?: (SoccerTeamStat | null)[] | null;
  readonly team_picture?: string | null;
  readonly divisions?: (DivisionTeam | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Team, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly founded?: string | null;
  readonly home_colour?: string | null;
  readonly away_colour?: string | null;
  readonly TeamNotes: AsyncCollection<TeamNote>;
  readonly team_history?: (SoccerTeamStat | null)[] | null;
  readonly team_picture?: string | null;
  readonly divisions: AsyncCollection<DivisionTeam>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Team = LazyLoading extends LazyLoadingDisabled ? EagerTeam : LazyTeam

export declare const Team: (new (init: ModelInit<Team>) => Team) & {
  copyOf(source: Team, mutator: (draft: MutableModel<Team>) => MutableModel<Team> | void): Team;
}

type EagerTeamNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamNote, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly description?: string | null;
  readonly team_id: string;
  readonly author_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeamNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamNote, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly description?: string | null;
  readonly team_id: string;
  readonly author_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly gameHomeTeamId: string;
  readonly gameAwayTeamId: string;
}

export declare type TeamNote = LazyLoading extends LazyLoadingDisabled ? EagerTeamNote : LazyTeamNote

export declare const TeamNote: (new (init: ModelInit<TeamNote>) => TeamNote) & {
  copyOf(source: TeamNote, mutator: (draft: MutableModel<TeamNote>) => MutableModel<TeamNote> | void): TeamNote;
}

type EagerDivision = {
type EagerDivision = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Division, 'id'>;
    identifier: ManagedIdentifier<Division, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly teams?: (string | null)[] | null;
  readonly season: string;
  readonly Games?: (Game | null)[] | null;
  readonly Games?: (Game | null)[] | null;
  readonly level?: DivisionsEnum | keyof typeof DivisionsEnum | null;
  readonly description?: string | null;
  readonly is_playoff?: boolean | null;
  readonly Teams?: (DivisionTeam | null)[] | null;
  readonly description?: string | null;
  readonly is_playoff?: boolean | null;
  readonly Teams?: (DivisionTeam | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDivision = {
type LazyDivision = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Division, 'id'>;
    identifier: ManagedIdentifier<Division, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly teams?: (string | null)[] | null;
  readonly season: string;
  readonly Games: AsyncCollection<Game>;
  readonly Games: AsyncCollection<Game>;
  readonly level?: DivisionsEnum | keyof typeof DivisionsEnum | null;
  readonly description?: string | null;
  readonly is_playoff?: boolean | null;
  readonly Teams: AsyncCollection<DivisionTeam>;
  readonly description?: string | null;
  readonly is_playoff?: boolean | null;
  readonly Teams: AsyncCollection<DivisionTeam>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Division = LazyLoading extends LazyLoadingDisabled ? EagerDivision : LazyDivision
export declare type Division = LazyLoading extends LazyLoadingDisabled ? EagerDivision : LazyDivision

export declare const Division: (new (init: ModelInit<Division>) => Division) & {
  copyOf(source: Division, mutator: (draft: MutableModel<Division>) => MutableModel<Division> | void): Division;
export declare const Division: (new (init: ModelInit<Division>) => Division) & {
  copyOf(source: Division, mutator: (draft: MutableModel<Division>) => MutableModel<Division> | void): Division;
}

type EagerSeason = {
type EagerSeason = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Season, 'id'>;
    identifier: ManagedIdentifier<Season, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly league: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly start_date?: string | null;
  readonly end_date?: string | null;
  readonly Divisions?: (Division | null)[] | null;
  readonly start_date?: string | null;
  readonly end_date?: string | null;
  readonly Divisions?: (Division | null)[] | null;
  readonly is_completed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySeason = {
type LazySeason = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Season, 'id'>;
    identifier: ManagedIdentifier<Season, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly league: string;
  readonly name?: string | null;
  readonly abbreviation?: string | null;
  readonly start_date?: string | null;
  readonly end_date?: string | null;
  readonly Divisions: AsyncCollection<Division>;
  readonly start_date?: string | null;
  readonly end_date?: string | null;
  readonly Divisions: AsyncCollection<Division>;
  readonly is_completed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Season = LazyLoading extends LazyLoadingDisabled ? EagerSeason : LazySeason
export declare type Season = LazyLoading extends LazyLoadingDisabled ? EagerSeason : LazySeason

export declare const Season: (new (init: ModelInit<Season>) => Season) & {
  copyOf(source: Season, mutator: (draft: MutableModel<Season>) => MutableModel<Season> | void): Season;
export declare const Season: (new (init: ModelInit<Season>) => Season) & {
  copyOf(source: Season, mutator: (draft: MutableModel<Season>) => MutableModel<Season> | void): Season;
}

type EagerLeague = {
type EagerLeague = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<League, 'id'>;
    identifier: ManagedIdentifier<League, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly sport?: string | null;
  readonly date_founded?: string | null;
  readonly date_founded?: string | null;
  readonly cost_per_individual?: number | null;
  readonly cost_per_team?: number | null;
  readonly coordinators?: (string | null)[] | null;
  readonly Seasons?: (Season | null)[] | null;
  readonly description?: string | null;
  readonly number_of_periods?: number | null;
  readonly time_per_period?: number | null;
  readonly coordinators?: (string | null)[] | null;
  readonly Seasons?: (Season | null)[] | null;
  readonly description?: string | null;
  readonly number_of_periods?: number | null;
  readonly time_per_period?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLeague = {
type LazyLeague = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<League, 'id'>;
    identifier: ManagedIdentifier<League, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly sport?: string | null;
  readonly date_founded?: string | null;
  readonly date_founded?: string | null;
  readonly cost_per_individual?: number | null;
  readonly cost_per_team?: number | null;
  readonly coordinators?: (string | null)[] | null;
  readonly Seasons: AsyncCollection<Season>;
  readonly description?: string | null;
  readonly number_of_periods?: number | null;
  readonly time_per_period?: number | null;
  readonly coordinators?: (string | null)[] | null;
  readonly Seasons: AsyncCollection<Season>;
  readonly description?: string | null;
  readonly number_of_periods?: number | null;
  readonly time_per_period?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type League = LazyLoading extends LazyLoadingDisabled ? EagerLeague : LazyLeague
export declare type League = LazyLoading extends LazyLoadingDisabled ? EagerLeague : LazyLeague

export declare const League: (new (init: ModelInit<League>) => League) & {
  copyOf(source: League, mutator: (draft: MutableModel<League>) => MutableModel<League> | void): League;
export declare const League: (new (init: ModelInit<League>) => League) & {
  copyOf(source: League, mutator: (draft: MutableModel<League>) => MutableModel<League> | void): League;
}

type EagerPlayerNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayerNote, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly player_id?: string | null;
  readonly date?: string | null;
  readonly description?: string | null;
  readonly author_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlayerNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayerNote, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly player_id?: string | null;
  readonly date?: string | null;
  readonly description?: string | null;
  readonly author_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PlayerNote = LazyLoading extends LazyLoadingDisabled ? EagerPlayerNote : LazyPlayerNote

export declare const PlayerNote: (new (init: ModelInit<PlayerNote>) => PlayerNote) & {
  copyOf(source: PlayerNote, mutator: (draft: MutableModel<PlayerNote>) => MutableModel<PlayerNote> | void): PlayerNote;
}

type EagerDivisionTeam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DivisionTeam, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teamId?: string | null;
  readonly divisionId?: string | null;
  readonly team: Team;
  readonly division: Division;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDivisionTeam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DivisionTeam, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teamId?: string | null;
  readonly divisionId?: string | null;
  readonly team: AsyncItem<Team>;
  readonly division: AsyncItem<Division>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DivisionTeam = LazyLoading extends LazyLoadingDisabled ? EagerDivisionTeam : LazyDivisionTeam

export declare const DivisionTeam: (new (init: ModelInit<DivisionTeam>) => DivisionTeam) & {
  copyOf(source: DivisionTeam, mutator: (draft: MutableModel<DivisionTeam>) => MutableModel<DivisionTeam> | void): DivisionTeam;
}