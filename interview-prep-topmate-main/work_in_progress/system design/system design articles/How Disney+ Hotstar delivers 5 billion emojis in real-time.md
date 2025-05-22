### How Disney+ Hotstar delivers 5 billion emojis in real-time

Here's a summary of what I learned:


- They send emojis to the server over HTTP and run the API server in the Go programming language

- They don’t do caching because emojis must be shown in real-time

- They avoided blocking resources and supported high concurrency via asynchronous processing

- They buffer the data and write it asynchronously in batches to the message queue (Kafka)

- They use an in-house data platform to run Kafka due to its high operational complexity

- They use Spark to process the stream of emojis from Kafka

- They write the aggregated emojis into another Kafka

- They sent the aggregated emojis to the PubSub infrastructure

- They use the MQTT protocol on PubSub to deliver the emojis to the client

- They use EMQX message broker to distribute the messages

- They use the reverse bridge architecture to scale the EMQX cluster


Also I wrote a detailed post with visuals of this case study in my newsletter.

Read now with other 39,001+ like-minded software engineers: https://lnkd.in/ecKdzYTQ