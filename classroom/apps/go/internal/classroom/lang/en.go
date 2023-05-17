package lang

func setUpEn() {
	en, _ := translator.GetTranslator("en")

	// ----- MESSAGES -------
	en.Add("updated user", "User updated successfully", true)
	en.Add("created class", "Class created successfully", true)
	en.Add("User added to section", "User added to section", true)
	en.Add("post created", "Post created successfully", true)
	en.Add("stored comment", "Comment created successfully", true)
	en.Add("deleted class", "Class deleted successfully", true)
	en.Add("archived class", "Class archived successfully", true)
	en.Add("unarchived class", "Class unarchived successfully", true)
	en.Add("section created", "Section created successfully", true)

	// ----- ERRORS ----------
	en.Add("not found", "Not found", true)
	en.Add("internal error", "An unexpected error has occurred.", true)
	en.Add("forbidden", "You don't have permission to perform this action.", true)
	en.Add("class not found", "Class not found", true)
	en.Add("not section owner", "You are not the owner of the section", true)
	en.Add("not class owner", "You are not the owner of the class", true)
	en.Add("not section member", "You are not a member of the section", true)
	en.Add("section name already exists", "The section name already exists", true)
	en.Add("section not found", "The section was not found", true)
	en.Add("section deleted", "The section was deleted", true)
	en.Add("class already archived", "The class is already archived", true)
	en.Add("class not archived", "The class is not archived", true)
	en.Add("user already in this class", "The user is already in this class", true)
	en.Add("not class student", "You are not a student of the class", true)
}
