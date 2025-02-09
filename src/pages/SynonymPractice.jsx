"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap"

const questions = [
    {
        word: "Big",
        synonyms: ["Large", "Tiny", "Huge", "Small"],
        correctSynonym: "Large",
    },
    {
        word: "Happy",
        synonyms: ["Joyful", "Sad", "Excited", "Angry"],
        correctSynonym: "Joyful",
    },
    {
        word: "Fast",
        synonyms: ["Quick", "Slow", "Rapid", "Sluggish"],
        correctSynonym: "Quick",
    },
]

export default function SynonymPractice() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedSynonym, setSelectedSynonym] = useState(null)
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState([])

    const currentQuestion = questions[currentQuestionIndex]

    const handleSubmit = () => {
        if (selectedSynonym) {
            const isCorrect = selectedSynonym === currentQuestion.correctSynonym
            setResults([
                ...results,
                {
                    word: currentQuestion.word,
                    correct: isCorrect,
                    selected: selectedSynonym,
                    correctAnswer: currentQuestion.correctSynonym,
                },
            ])

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                setSelectedSynonym(null)
            } else {
                setShowResults(true)
            }
        }
    }

    const resetQuiz = () => {
        setCurrentQuestionIndex(0)
        setSelectedSynonym(null)
        setShowResults(false)
        setResults([])
    }

    const correctCount = results.filter((r) => r.correct).length

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Synonym Practice</Card.Title>
                            {!showResults ? (
                                <>
                                    <div className="text-center mb-4">
                                        <h3 className="display-4 fw-bold text-primary">{currentQuestion.word}</h3>
                                    </div>
                                    <Row className="g-4 mb-4">
                                        {currentQuestion.synonyms.map((synonym) => (
                                            <Col key={synonym} xs={12} md={6}>
                                                <Card
                                                    className={`h-100 p-3 ${selectedSynonym === synonym ? "border-primary shadow-sm" : ""
                                                        }`}
                                                    onClick={() => setSelectedSynonym(synonym)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <Card.Body>
                                                        <Form.Check
                                                            type="radio"
                                                            name="synonym"
                                                            id={synonym}
                                                            label={synonym}
                                                            checked={selectedSynonym === synonym}
                                                            onChange={() => setSelectedSynonym(synonym)}
                                                        />
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                    <div className="d-grid">
                                        <Button onClick={handleSubmit} disabled={!selectedSynonym} size="lg">
                                            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
                                        </Button>
                                    </div>
                                    <div className="mt-3 text-center text-muted">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-center mb-4">Quiz Results</h3>
                                    {results.map((result, index) => (
                                        <div key={index} className="mb-3">
                                            <p>
                                                <strong>{result.word}:</strong>{" "}
                                                {result.correct ? (
                                                    <span className="text-success">Correct</span>
                                                ) : (
                                                    <span className="text-danger">Incorrect</span>
                                                )}
                                            </p>
                                            {!result.correct && (
                                                <p className="text-muted small">
                                                    You selected: {result.selected}. Correct answer: {result.correctAnswer}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                    <div className="text-center mt-4">
                                        <p className="fw-bold">
                                            Total Score: {correctCount} / {results.length}
                                        </p>
                                        <Button onClick={resetQuiz} className="mt-3">
                                            Start Over
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}