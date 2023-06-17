package main

import "github.com/Binaretech/classroom/internal/classroom/cmd"

// @title Classroom API
// @version 0.1
// @description Main API for the classroom app
// @host localhost
// @basePath /api
// @contact.name Binaretech
// @securityDefinitions.apikey Authorization Token
// @in header
// @name Authorization

// @license.name Apache 2.0
func main() {
	cmd.Execute()
}
