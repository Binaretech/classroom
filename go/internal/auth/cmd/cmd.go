package cmd

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"time"

	"github.com/Binaretech/classroom/config"
	"github.com/Binaretech/classroom/internal/auth/database"
	"github.com/Binaretech/classroom/internal/auth/server"
	"github.com/getsentry/sentry-go"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var rootCmd = &cobra.Command{
	Use:   "Classroom Auth",
	Short: "Authentication service",
	Run: func(cmd *cobra.Command, args []string) {
		config.Initialize()

		client, err := database.Connect()

		if err != nil {
			log.Fatalln(err.Error())
		}

		defer database.Close(client)

		database := database.GetDatabase(client)

		err = sentry.Init(sentry.ClientOptions{
			Dsn:              viper.GetString("auth_sentry_dsn"),
			TracesSampleRate: viper.GetFloat64("auth_sentry_traces_sample_rate"),
		})

		if err != nil {
			log.Fatalln(err.Error())
		}

		defer sentry.Flush(2 * time.Second)

		e := server.App(database)

		go func() {
			if err := e.Start(fmt.Sprintf(":%s", viper.GetString("auth_port"))); err != nil {
				log.Fatalln(err.Error())

				os.Exit(1)
			}
		}()

		quit := make(chan os.Signal, 1)
		signal.Notify(quit, os.Interrupt)
		<-quit

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		if err := e.Shutdown(ctx); err != nil {
			log.Fatalln(err.Error())
		}

	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
