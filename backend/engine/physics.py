import math

def calculate_analytical_th_out(th_in: float, tc_in: float, m_h: float, m_c: float) -> float:
    """
    Calculates the hot fluid outlet temperature (Th_out) for a Parallel Flow Heat Exchanger
    using the Effectiveness-NTU (Number of Transfer Units) method.
    """
    # Specific heat capacity of water (J/kg*K) - assuming water for both fluids
    Cp = 4184.0 
    
    # Heat capacity rates (W/K)
    C_h = m_h * Cp
    C_c = m_c * Cp
    
    # Edge case: If either flow is 0, no heat transfer occurs
    if C_h == 0 or C_c == 0:
        return th_in 
        
    C_min = min(C_h, C_c)
    C_max = max(C_h, C_c)
    c_ratio = C_min / C_max
    
    # Assume a constant UA (Overall Heat Transfer Coefficient * Area) = 500 W/K for this lab setup
    UA = 500.0 
    NTU = UA / C_min
    
    # Effectiveness formula specifically for PARALLEL FLOW
    # epsilon = (1 - exp(-NTU * (1 + c))) / (1 + c)
    try:
        effectiveness = (1.0 - math.exp(-NTU * (1.0 + c_ratio))) / (1.0 + c_ratio)
    except OverflowError:
        effectiveness = 1.0 / (1.0 + c_ratio) # Fallback for extreme NTU values
    
    # Maximum possible heat transfer (W)
    q_max = C_min * (th_in - tc_in)
    
    # Actual heat transfer (W)
    q_actual = effectiveness * q_max
    
    # Final hot fluid outlet temperature
    th_out = th_in - (q_actual / C_h)
    
    return round(th_out, 2)