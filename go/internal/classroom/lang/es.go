package lang

func setUpEs() {
	es, _ := translator.GetTranslator("es")

	// ----- MESSAGES --------
	es.Add("updated user", "Usuario actualizado con éxito", true)
	es.Add("created class", "Clase creada con éxito", true)
	es.Add("User added to section", "Usuario agregado a la sección", true)
	es.Add("post created", "Publicación creada con éxito", true)
	es.Add("stored comment", "Comentario creado con éxito", true)
	es.Add("deleted class", "Clase eliminada con éxito", true)
	es.Add("archived class", "Clase archivada con éxito", true)
	es.Add("unarchived class", "Clase desarchivada con éxito", true)
	es.Add("section created", "Sección creada con éxito", true)

	// ----- ERRORS ----------
	es.Add("not found", "No encontrado", true)
	es.Add("internal error", "Ha ocurrido un error en el servidor.", true)
	es.Add("forbidden", "No tienes permiso para realizar esta acción.", true)
	es.Add("class not found", "Clase no encontrada", true)
	es.Add("not section owner", "No eres el propietario de la sección", true)
	es.Add("not class owner", "No eres el propietario de la clase", true)
	es.Add("not section member", "No eres miembro de la sección", true)
	es.Add("section name already exists", "El nombre de la sección ya existe", true)
	es.Add("section not found", "La sección no fue encontrada", true)
	es.Add("section deleted", "La sección fue eliminada", true)
	es.Add("class already archived", "La clase ya está archivada", true)
	es.Add("class not archived", "La clase no está archivada", true)
	es.Add("user already in this class", "El usuario ya está en esta clase", true)
	es.Add("not class student", "No eres estudiante de la clase", true)
}
