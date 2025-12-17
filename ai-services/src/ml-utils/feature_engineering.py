"""
Feature Engineering - Create features from raw data
"""
import pandas as pd
import numpy as np
from typing import List, Dict


class FeatureEngineering:
    """Engineer features for ML models"""
    
    def create_technical_indicators(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create technical indicators from price data"""
        df = df.copy()
        
        # Moving averages
        df['sma_20'] = df['price'].rolling(window=20).mean()
        df['sma_50'] = df['price'].rolling(window=50).mean()
        
        # RSI (Relative Strength Index)
        delta = df['price'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        rs = gain / loss
        df['rsi'] = 100 - (100 / (1 + rs))
        
        # MACD
        ema_12 = df['price'].ewm(span=12, adjust=False).mean()
        ema_26 = df['price'].ewm(span=26, adjust=False).mean()
        df['macd'] = ema_12 - ema_26
        df['macd_signal'] = df['macd'].ewm(span=9, adjust=False).mean()
        
        return df
    
    def create_lag_features(self, df: pd.DataFrame, columns: List[str], lags: List[int]) -> pd.DataFrame:
        """Create lag features"""
        df = df.copy()
        
        for col in columns:
            for lag in lags:
                df[f'{col}_lag_{lag}'] = df[col].shift(lag)
        
        return df
    
    def create_rolling_features(self, df: pd.DataFrame, columns: List[str], windows: List[int]) -> pd.DataFrame:
        """Create rolling window features"""
        df = df.copy()
        
        for col in columns:
            for window in windows:
                df[f'{col}_rolling_mean_{window}'] = df[col].rolling(window=window).mean()
                df[f'{col}_rolling_std_{window}'] = df[col].rolling(window=window).std()
                df[f'{col}_rolling_max_{window}'] = df[col].rolling(window=window).max()
                df[f'{col}_rolling_min_{window}'] = df[col].rolling(window=window).min()
        
        return df
    
    def create_interaction_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create interaction features"""
        df = df.copy()
        
        if 'volume' in df.columns and 'price' in df.columns:
            df['price_volume'] = df['price'] * df['volume']
        
        if 'sma_20' in df.columns and 'price' in df.columns:
            df['price_sma_ratio'] = df['price'] / df['sma_20']
        
        return df
