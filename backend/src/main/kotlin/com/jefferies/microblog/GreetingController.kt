package com.jefferies.microblog

import org.springframework.web.bind.annotation.*
import java.io.File
import java.util.ArrayList
import java.util.UUID

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
class GreetingController {

    @PostMapping("/api/blog", consumes = ["text/plain"])
    fun saveBlog(@RequestBody body:String) {
        var uuid = UUID.randomUUID()
        var file = File("data/$uuid.json")
        file.writeText(body.toString())
    }

    @GetMapping("/api/blog")
    fun getAllBlogs() : ArrayList<String> {
        var filenames = ArrayList<String>()
        File("data/").walk().forEach { filenames.add(it.name) }
        return filenames
    }

    @GetMapping("/api/blog/{id}")
    fun getBlog(@PathVariable("id") id:String) : String {
        var text= File("data/$id").readText(Charsets.UTF_8)
        return text
    }

}