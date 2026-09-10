package com.devtrack.integration;

import com.devtrack.model.CodingStatistic;

/**
 * Interface representing a coding platform integration.
 * Demonstrates Abstraction and Polymorphism.
 */
public interface CodingPlatformIntegration {
    
    /**
     * Gets the name of the coding platform.
     */
    String getPlatformName();
    
    /**
     * Fetches statistics for a given handle/username from the platform's API.
     * @param handle the user's handle on the platform
     * @return CodingStatistic containing fetched data
     */
    CodingStatistic fetchStatistics(String handle) throws Exception;
}
