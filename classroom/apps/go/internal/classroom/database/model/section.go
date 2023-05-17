package model

type MemberType uint8

const (
	MEMBER_TYPE_ADMIN MemberType = iota
	MEMBER_TYPE_TEACHER
	MEMBER_TYPE_STUDENT
)

// Section represents a section of a class
type Section struct {
	BigID
	Name      string     `gorm:"size:32;not null" json:"name"`
	ClassID   uint       `gorm:"foreignKey;not null" json:"classId"`
	Class     *Class     `json:"class,omitempty"`
	Students  []User     `gorm:"many2many:students;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"students,omitempty"`
	Teachers  []User     `gorm:"many2many:teachers;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"teachers,omitempty"`
	Materials []Material `gorm:"polymorphic:Materialable;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"materials,omitempty"`
	Timestamps
}
