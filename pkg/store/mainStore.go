package store

type MainStore struct {
	UserStore
}

func NewMainStore(userstore UserStore) *MainStore {
	return &MainStore{
		UserStore: userstore,
	}
}
