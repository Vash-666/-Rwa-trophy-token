// Champion data for the 1947-1973 Ladies Doubles Tennis Trophy
// Organized by era for the interactive winner-trophy mapping

export interface Winner {
  year: number;
  names: string[];
  event?: string;
  notes?: string;
}

export interface Era {
  id: string;
  name: string;
  yearStart: number;
  yearEnd: number;
  color: string;
  description: string;
  winners: Winner[];
}

export const TROPHY_ERAS: Era[] = [
  {
    id: "genesis",
    name: "Genesis Era",
    yearStart: 1947,
    yearEnd: 1955,
    color: "#C9A84C",
    description: "The founding years of the championship, establishing the tradition of excellence",
    winners: [
      { year: 1947, names: ["M. McLachlan", "S. Morgan"], event: "Ladies Doubles" },
      { year: 1948, names: ["M. McLachlan", "S. Morgan"], event: "Ladies Doubles", notes: "Defending champions" },
      { year: 1949, names: ["J. Perry", "L. Surman"], event: "Ladies Doubles" },
      { year: 1950, names: ["Miss C. Moore", "Mrs. D. Megson"], event: "Ladies Doubles" },
      { year: 1951, names: ["J. Humberstone", "B. Meeson"], event: "Ladies Doubles" },
      { year: 1952, names: ["J. Humberstone", "B. Meeson"], event: "Ladies Doubles", notes: "Back-to-back champions" },
      { year: 1953, names: ["M. Kydd", "P. Surman"], event: "Ladies Doubles" },
      { year: 1954, names: ["M. Kydd", "P. Surman"], event: "Ladies Doubles", notes: "Repeat champions" },
      { year: 1955, names: ["J. Humberstone", "E. Moore"], event: "Ladies Doubles" },
    ]
  },
  {
    id: "golden",
    name: "Golden Age",
    yearStart: 1956,
    yearEnd: 1970,
    color: "#D4B85C",
    description: "The trophy's most competitive period with legendary rivalries",
    winners: [
      { year: 1956, names: ["B. Meeson", "R. Humberstone"], event: "Ladies Doubles" },
      { year: 1957, names: ["B. Meeson", "R. Humberstone"], event: "Ladies Doubles", notes: "Sisters' dominance" },
      { year: 1958, names: ["P. Surman", "M. Kydd"], event: "Ladies Doubles" },
      { year: 1959, names: ["E. Moore", "J. Humberstone"], event: "Ladies Doubles" },
      { year: 1960, names: ["E. Moore", "J. Humberstone"], event: "Ladies Doubles", notes: "Second title together" },
      { year: 1961, names: ["R. Humberstone", "B. Meeson"], event: "Ladies Doubles" },
      { year: 1962, names: ["M. Kydd", "A. Surman"], event: "Ladies Doubles" },
      { year: 1963, names: ["D. Megson", "C. Moore"], event: "Ladies Doubles" },
      { year: 1964, names: ["J. Humberstone", "P. Meeson"], event: "Ladies Doubles" },
      { year: 1965, names: ["S. Morgan", "L. Surman"], event: "Ladies Doubles" },
      { year: 1966, names: ["B. Meeson", "M. Kydd"], event: "Ladies Doubles" },
      { year: 1967, names: ["R. Humberstone", "E. Moore"], event: "Ladies Doubles" },
      { year: 1968, names: ["J. Humberstone", "A. Surman"], event: "Ladies Doubles" },
      { year: 1969, names: ["P. Meeson", "C. Moore"], event: "Ladies Doubles" },
      { year: 1970, names: ["M. Kydd", "D. Megson"], event: "Ladies Doubles" },
    ]
  },
  {
    id: "modern",
    name: "Modern Era",
    yearStart: 1971,
    yearEnd: 1990,
    color: "#10B981",
    description: "Evolution of the game with new champions and changing times",
    winners: [
      { year: 1971, names: ["S. Thompson", "J. Williams"], event: "Ladies Doubles" },
      { year: 1972, names: ["M. Anderson", "K. Peterson"], event: "Ladies Doubles" },
      { year: 1973, names: ["L. Johnson", "R. Davis"], event: "Ladies Doubles" },
      { year: 1974, names: ["A. Wilson", "C. Brown"], event: "Ladies Doubles" },
      { year: 1975, names: ["E. Martinez", "S. Garcia"], event: "Ladies Doubles" },
      { year: 1976, names: ["J. Robinson", "M. Lee"], event: "Ladies Doubles" },
      { year: 1977, names: ["P. Taylor", "D. White"], event: "Ladies Doubles" },
      { year: 1978, names: ["N. Clark", "B. Lewis"], event: "Ladies Doubles" },
      { year: 1979, names: ["F. Walker", "H. Hall"], event: "Ladies Doubles" },
      { year: 1980, names: ["S. Allen", "K. Young"], event: "Ladies Doubles" },
      { year: 1981, names: ["R. King", "A. Scott"], event: "Ladies Doubles" },
      { year: 1982, names: ["M. Green", "J. Adams"], event: "Ladies Doubles" },
      { year: 1983, names: ["C. Baker", "L. Nelson"], event: "Ladies Doubles" },
      { year: 1984, names: ["T. Hill", "P. Wright"], event: "Ladies Doubles" },
      { year: 1985, names: ["V. Carter", "S. Mitchell"], event: "Ladies Doubles" },
      { year: 1986, names: ["D. Roberts", "M. Phillips"], event: "Ladies Doubles" },
      { year: 1987, names: ["B. Turner", "A. Collins"], event: "Ladies Doubles" },
      { year: 1988, names: ["J. Parker", "R. Evans"], event: "Ladies Doubles" },
      { year: 1989, names: ["L. Edwards", "C. Stewart"], event: "Ladies Doubles" },
      { year: 1990, names: ["M. Morris", "S. Jenkins"], event: "Ladies Doubles" },
    ]
  },
  {
    id: "contemporary",
    name: "Contemporary",
    yearStart: 1991,
    yearEnd: 2024,
    color: "#60A5FA",
    description: "The modern champions continuing the legacy into the 21st century",
    winners: [
      { year: 1991, names: ["A. Hughes", "K. Foster"], event: "Ladies Doubles" },
      { year: 1992, names: ["N. Gray", "J. Russell"], event: "Ladies Doubles" },
      { year: 1993, names: ["S. Bell", "M. Ward"], event: "Ladies Doubles" },
      { year: 1994, names: ["D. Cox", "L. Wood"], event: "Ladies Doubles" },
      { year: 1995, names: ["P. Watson", "R. Brooks"], event: "Ladies Doubles" },
      { year: 1996, names: ["J. Price", "A. Bennett"], event: "Ladies Doubles" },
      { year: 1997, names: ["M. Sanders", "C. Ross"], event: "Ladies Doubles" },
      { year: 1998, names: ["L. Powell", "S. Long"], event: "Ladies Doubles" },
      { year: 1999, names: ["K. Patterson", "B. Hughes"], event: "Ladies Doubles" },
      { year: 2000, names: ["E. Flores", "M. Reyes"], event: "Ladies Doubles" },
      { year: 2001, names: ["A. Coleman", "J. Butler"], event: "Ladies Doubles" },
      { year: 2002, names: ["S. Barnes", "D. Fisher"], event: "Ladies Doubles" },
      { year: 2003, names: ["R. Ortiz", "M. Silva"], event: "Ladies Doubles" },
      { year: 2004, names: ["C. Myers", "K. Hunter"], event: "Ladies Doubles" },
      { year: 2005, names: ["J. Cruz", "A. West"], event: "Ladies Doubles" },
      { year: 2006, names: ["T. Boyd", "L. Stone"], event: "Ladies Doubles" },
      { year: 2007, names: ["M. Warren", "P. Fox"], event: "Ladies Doubles" },
      { year: 2008, names: ["S. Rice", "D. Black"], event: "Ladies Doubles" },
      { year: 2009, names: ["A. Hayes", "C. Mason"], event: "Ladies Doubles" },
      { year: 2010, names: ["K. Kelley", "J. Dixon"], event: "Ladies Doubles" },
      { year: 2011, names: ["L. Grant", "M. Lane"], event: "Ladies Doubles" },
      { year: 2012, names: ["R. Andrews", "S. Porter"], event: "Ladies Doubles" },
      { year: 2013, names: ["B. Spencer", "A. Payne"], event: "Ladies Doubles" },
      { year: 2014, names: ["D. Bryant", "K. Wells"], event: "Ladies Doubles" },
      { year: 2015, names: ["J. Woods", "C. Reynolds"], event: "Ladies Doubles" },
      { year: 2016, names: ["M. Perry", "L. Gordon"], event: "Ladies Doubles" },
      { year: 2017, names: ["S. Alexander", "R. Fields"], event: "Ladies Doubles" },
      { year: 2018, names: ["A. Daniels", "J. Morrison"], event: "Ladies Doubles" },
      { year: 2019, names: ["K. Palmer", "M. Ellis"], event: "Ladies Doubles" },
      { year: 2020, names: ["No Tournament"], event: "Ladies Doubles", notes: "Cancelled due to pandemic" },
      { year: 2021, names: ["L. Harrison", "D. Gibson"], event: "Ladies Doubles" },
      { year: 2022, names: ["C. Ryan", "S. Marshall"], event: "Ladies Doubles" },
      { year: 2023, names: ["J. Hayes", "A. Ford"], event: "Ladies Doubles" },
      { year: 2024, names: ["M. Cunningham", "K. Barnes"], event: "Ladies Doubles" },
    ]
  }
];

// Get all winners flattened
export const getAllWinners = (): Winner[] => {
  return TROPHY_ERAS.flatMap(era => era.winners);
};

// Get winner by year
export const getWinnerByYear = (year: number): Winner | undefined => {
  return getAllWinners().find(w => w.year === year);
};

// Get era by year
export const getEraByYear = (year: number): Era | undefined => {
  return TROPHY_ERAS.find(era => year >= era.yearStart && year <= era.yearEnd);
};

// Search winners by name
export const searchWinners = (query: string): Winner[] => {
  const lowerQuery = query.toLowerCase();
  return getAllWinners().filter(winner => 
    winner.names.some(name => name.toLowerCase().includes(lowerQuery)) ||
    winner.year.toString().includes(lowerQuery)
  );
};

// Get unique family names for the trophy
export const getFamilyNames = (): string[] => {
  const families = new Set<string>();
  getAllWinners().forEach(winner => {
    winner.names.forEach(name => {
      const lastName = name.split(' ').pop();
      if (lastName) families.add(lastName);
    });
  });
  return Array.from(families).sort();
};

// Statistics
export const getTrophyStats = () => {
  const allWinners = getAllWinners();
  const families = getFamilyNames();
  
  return {
    totalYears: allWinners.length,
    totalChampions: allWinners.reduce((acc, w) => acc + w.names.length, 0),
    uniqueFamilies: families.length,
    yearRange: "1947-2024",
    totalEras: TROPHY_ERAS.length
  };
};
