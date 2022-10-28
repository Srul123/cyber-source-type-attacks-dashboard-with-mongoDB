export interface OptionsAttacks {
  name: string;
  value: string;
}
export interface AttackByTypeResponse {
    clearSeverities?: AttackSeverities;
    clearTypes?: AttackSpecs;
    darkSeverities?: AttackSeverities;
    darkTypes?: AttackSpecs;
    riskMeter?: number;
  }
  

export interface AttackSeverities {
    highSpec: number;
    mediumSpec: number;
    lowSpec: number;
    severityStrength: number;
}

export interface AttackSpecs {
    vipSpec: number;
    attackIndicationSpec: number;
    exploitableDataSpec: number;
    brandSecuritySpec: number;
    dataLeakageSpec: number;
    phishingSpec: number;
    typeStrength: number;
  }