package datatypes

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
)

type JsonArray[T any] []T

func (j *JsonArray[T]) Scan(value any) error {
	bytes, ok := value.(string)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal JSONB value:", value))
	}

	arr := []T{}
	if err := json.Unmarshal([]byte(bytes), &arr); err != nil {
		return err
	}

	*j = arr

	return nil

}

func (j JsonArray[T]) Value() (driver.Value, error) {
	return json.Marshal(j)
}
