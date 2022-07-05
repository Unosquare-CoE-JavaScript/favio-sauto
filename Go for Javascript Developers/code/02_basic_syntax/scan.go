package main

import "fmt"

func main() {
	var s1 string
	var s2 string

	fmt.Println("Enter two strings separated by a space")

	numberOfArgs, err := fmt.Scan(&s1, &s2)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Number of args:", numberOfArgs, "String 1:", s1, "String 2:", s2)
}
