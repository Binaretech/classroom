package config

import (
	"os"

	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func init() {
	Initialize()
}

// Initialize the configuration
func Initialize() {
	viper.SetDefault("AUTH_SERVICE_PORT", 80)
	viper.SetDefault("AUTH_DOCS_PORT", 80)
	
	viper.SetDefault("MAIN_SERVICE_PORT", 80)
	viper.SetDefault("MAIN_DOCS_PORT", 80)


	viper.SetDefault("lang", "es")

	viper.SetConfigName(".env")
	viper.SetConfigType("env")
	viper.AddConfigPath(".")
	viper.AddConfigPath("..")
	viper.AddConfigPath("../../")

	if path, err := os.Getwd(); err == nil {
		viper.AddConfigPath(path)
	}

	if err := viper.ReadInConfig(); err != nil {
		logrus.Info(err.Error())
	}

	viper.AutomaticEnv()
}
