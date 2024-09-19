package handlers

// var userTemplate = `
// <p><a href="/logout/{{.Provider}}">logout</a></p>
// <p>Name: {{.Name}} [{{.LastName}}, {{.FirstName}}]</p>
// <p>Email: {{.Email}}</p>
// <p>NickName: {{.NickName}}</p>
// <p>Location: {{.Location}}</p>
// <p>AvatarURL: {{.AvatarURL}} <img src="{{.AvatarURL}}"></p>
// <p>Description: {{.Description}}</p>
// <p>UserID: {{.UserID}}</p>
// <p>AccessToken: {{.AccessToken}}</p>
// <p>ExpiresAt: {{.ExpiresAt}}</p>
// <p>RefreshToken: {{.RefreshToken}}</p>
// `

// // AuthCallback handles the OAuth callback
// func AuthCallback(res http.ResponseWriter, req *http.Request) {
// 	user, err := gothic.CompleteUserAuth(res, req)
// 	if err != nil {
// 		fmt.Fprintln(res, err)
// 		return
// 	}
// 	t, _ := template.New("user").Parse(userTemplate)
// 	t.Execute(res, user)
// }

// // AuthBegin starts the authentication process
// func AuthBegin(res http.ResponseWriter, req *http.Request) {
// 	if gothUser, err := gothic.CompleteUserAuth(res, req); err == nil {
// 		t, _ := template.New("user").Parse(userTemplate)
// 		t.Execute(res, gothUser)
// 	} else {
// 		gothic.BeginAuthHandler(res, req)
// 	}
// }

// // Logout handles user logout
// func Logout(res http.ResponseWriter, req *http.Request) {
// 	gothic.Logout(res, req)
// 	res.Header().Set("Location", "/")
// 	res.WriteHeader(http.StatusTemporaryRedirect)
// }
