package model

type Comment struct {
	BigID
	Content string `gorm:"type:text" json:"content"`
	UserID  string `json:"userId"`
	PostID  uint   `json:"postId"`
	Post    *Post  `json:"post,omitempty"`
	User    *User  `json:"user,omitempty"`
	Timestamps
}
