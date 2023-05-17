package model

// Class represents a class in the database.
type Class struct {
	BigID
	Name        string     `gorm:"size:64,not null" json:"name"`
	Description *string    `gorm:"size:255,not null" json:"description,omitempty"`
	OwnerID     string     `gorm:"foreignKey,size:64,not null" json:"ownerId"`
	Owner       *User      `json:"owner,omitempty"`
	Sections    []Section  `json:"sections,omitempty"`
	Archived    bool       `gorm:"not null;default:false" json:"archived"`
	Materials   []Material `gorm:"polymorphic:Materialable" json:"materials,omitempty"`
	Timestamps
}
