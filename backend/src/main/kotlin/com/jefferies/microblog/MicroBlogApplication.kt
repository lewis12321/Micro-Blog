package com.jefferies.microblog

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MicroBlogApplication

fun main(args: Array<String>) {
	runApplication<MicroBlogApplication>(*args)
}
