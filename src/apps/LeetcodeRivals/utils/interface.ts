export interface UserProfile {
    username: string;
    name: string;
    avatar: string;
    ranking: number;
    reputation: number;
    github?: string
}

export interface UserStats {
    status: "success" | "error",
    message: string,
    totalSolved: number,
    totalQuestions: number,
    easySolved: number,
    totalEasy: number,
    mediumSolved: number,
    totalMedium: number,
    hardSolved: number,
    totalHard: number,
    acceptanceRate: number,
    contributionPoints: number,
    ranking: number,
    reputation: number,
}

export interface UserDetails {
    profile: UserProfile,
    stats: UserStats
}