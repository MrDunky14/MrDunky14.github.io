export type PrecisionMode = 'FP16' | 'TernaryQAT';
export type ResolutionTarget = '1080p' | '1440p';

export interface MyelinMetricCell {
  inputResolution: string;
  outputResolution: string;
  precision: PrecisionMode;
  frameTimeMs: number;
  fps: number;
  vramMb: number;
  weightKb: number;
  psnrDb: number;
  psnrGain: string;
  numericalParity: string;
  speedupVsBaseline?: string;
}

export interface EngramMetrics {
  ingestRateTriplesPerSec: number;
  twoHopTraversalLatencyNs: number;
  depthFiveSpreadPerNodeNs: number;
  workingSetVirtualAllocRssMb: number;
  sqliteSpeedupMultiplier: number;
  timerFrequencyHz: number;
  concurrencyModel: string;
}

export interface SreBenchMetrics {
  simulationThroughputEpsPerSec: number;
  totalTasks: number;
  coveredFaultTypes: number;
  pytestPassingCount: number;
  totalPytests: number;
  dagNodeCount: number;
  antiExploitGuards: string[];
}

export interface FlagshipProject {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  tags: string[];
  repoUrl: string;
  architecturePoints: string[];
  benchmarksPoints: string[];
  receiptsPoints: string[];
}

export interface SupportingProject {
  id: string;
  name: string;
  category: string;
  status: string;
  tags: string[];
  problem: string;
  solution: string;
  metrics: string[];
  repoUrl?: string;
}

export interface BenchmarkArchiveEntry {
  system: string;
  metric: string;
  empiricalValue: string;
  hardwareBaseline: string;
  validationMethod: string;
  category: 'Latency' | 'Throughput' | 'Memory' | 'Correctness';
}

export interface CodeReceipt {
  id: string;
  title: string;
  system: string;
  filePath: string;
  language: string;
  description: string;
  reproductionCommand: string;
  repoUrl: string;
  code: string;
}
