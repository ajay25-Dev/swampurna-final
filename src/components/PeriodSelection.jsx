import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiInfo, FiTrendingUp } from 'react-icons/fi';

const PeriodSelection = () => {
    const today = new Date();
    const [lastPeriodDate, setLastPeriodDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5));
    const [duration, setDuration] = useState(5);
    const [cycleLength, setCycleLength] = useState(28);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [trackerData, setTrackerData] = useState([]);
    const [predictions, setPredictions] = useState(null);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        if (lastPeriodDate && duration && cycleLength) {
            calculatePredictions();
            generateCalendar();
        }
    }, [lastPeriodDate, duration, cycleLength, currentMonth]);

    const calculatePredictions = () => {
        const nextPeriodStart = new Date(lastPeriodDate);
        nextPeriodStart.setDate(nextPeriodStart.getDate() + cycleLength);
        
        const nextPeriodEnd = new Date(nextPeriodStart);
        nextPeriodEnd.setDate(nextPeriodEnd.getDate() + duration - 1);
        
        const ovulationDate = new Date(lastPeriodDate);
        ovulationDate.setDate(ovulationDate.getDate() + Math.floor(cycleLength / 2));
        
        const fertileWindowStart = new Date(ovulationDate);
        fertileWindowStart.setDate(fertileWindowStart.getDate() - 3);
        
        const fertileWindowEnd = new Date(ovulationDate);
        fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 2);

        setPredictions({
            nextPeriodStart: nextPeriodStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            nextPeriodEnd: nextPeriodEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            ovulationDate: ovulationDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            fertileWindowStart: fertileWindowStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
            fertileWindowEnd: fertileWindowEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
        });
    };

    const generateCalendar = () => {
        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const startDate = new Date(lastPeriodDate);
        
        const tracker = [];
        const firstDayOfWeek = firstDay.getDay();
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            tracker.push({ date: null, type: null, isCurrentMonth: false });
        }
        
        // Generate days for the current month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const daysSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
            const cycleDay = ((daysSinceStart % cycleLength) + cycleLength) % cycleLength;
            
            let type = null;
            let isToday = currentDate.toDateString() === today.toDateString();
            
            if (cycleDay >= 0 && cycleDay < duration) {
                type = 'period';
            } else if (cycleDay === Math.floor(cycleLength / 2)) {
                type = 'ovulation';
            } else if (cycleDay >= duration && cycleDay < duration + 3) {
                type = 'post-period';
            } else if (cycleDay >= cycleLength - 3 && cycleDay < cycleLength) {
                type = 'pre-period';
            } else if (cycleDay >= Math.floor(cycleLength / 2) - 3 && cycleDay <= Math.floor(cycleLength / 2) + 2) {
                type = 'fertile';
            }
            
            tracker.push({ 
                date: day, 
                type, 
                isCurrentMonth: true,
                isToday 
            });
        }
        
        setTrackerData(tracker);
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleDateChange = (e) => {
        const newDate = new Date(e.target.value);
        setLastPeriodDate(newDate);
    };

    const formatDateForInput = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <Container>
            <CalculatorCard>
                <CardHeader>
                    <IconWrapper>
                        <FiCalendar />
                    </IconWrapper>
                    <HeaderContent>
                        <h2>Period Calculator</h2>
                        <p>Track your cycle and get personalized predictions</p>
                    </HeaderContent>
                </CardHeader>

                <InputGrid>
                    <InputField>
                        <Label>
                            <span>Last Period Start Date</span>
                            <InfoIcon onClick={() => setShowInfo(!showInfo)}>
                                <FiInfo />
                            </InfoIcon>
                        </Label>
                        <DateInput
                            type="date"
                            value={formatDateForInput(lastPeriodDate)}
                            onChange={handleDateChange}
                            max={formatDateForInput(today)}
                        />
                    </InputField>

                    <InputField>
                        <Label>Period Duration</Label>
                        <SliderContainer>
                            <Slider
                                type="range"
                                min="3"
                                max="10"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                            />
                            <SliderValue>{duration} {duration === 1 ? 'day' : 'days'}</SliderValue>
                        </SliderContainer>
                    </InputField>

                    <InputField>
                        <Label>Cycle Length</Label>
                        <SliderContainer>
                            <Slider
                                type="range"
                                min="21"
                                max="35"
                                value={cycleLength}
                                onChange={(e) => setCycleLength(parseInt(e.target.value))}
                            />
                            <SliderValue>{cycleLength} {cycleLength === 1 ? 'day' : 'days'}</SliderValue>
                        </SliderContainer>
                    </InputField>
                </InputGrid>

                {showInfo && (
                    <InfoBox>
                        <p><strong>Tip:</strong> Your last period start date is the first day you started bleeding. This helps us calculate your cycle accurately.</p>
                    </InfoBox>
                )}
            </CalculatorCard>

            {predictions && (
                <PredictionsCard>
                    <PredictionsHeader>
                        <FiTrendingUp />
                        <h3>Your Predictions</h3>
                    </PredictionsHeader>
                    <PredictionsGrid>
                        <PredictionItem className="next-period">
                            <PredictionLabel>Next Period</PredictionLabel>
                            <PredictionValue>{predictions.nextPeriodStart}</PredictionValue>
                            <PredictionSubtext>to {predictions.nextPeriodEnd}</PredictionSubtext>
                        </PredictionItem>
                        <PredictionItem className="ovulation">
                            <PredictionLabel>Ovulation Day</PredictionLabel>
                            <PredictionValue>{predictions.ovulationDate}</PredictionValue>
                        </PredictionItem>
                        <PredictionItem className="fertile">
                            <PredictionLabel>Fertile Window</PredictionLabel>
                            <PredictionValue>{predictions.fertileWindowStart} - {predictions.fertileWindowEnd}</PredictionValue>
                        </PredictionItem>
                    </PredictionsGrid>
                </PredictionsCard>
            )}

            <CalendarCard>
                <CalendarHeader>
                    <NavButton onClick={handlePrevMonth}>
                        <FiChevronLeft />
                    </NavButton>
                    <MonthYear>
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </MonthYear>
                    <NavButton onClick={handleNextMonth}>
                        <FiChevronRight />
                    </NavButton>
                </CalendarHeader>

                <WeekDaysRow>
                    {weekDays.map((day, index) => (
                        <WeekDay key={index}>{day}</WeekDay>
                    ))}
                </WeekDaysRow>

                <CalendarGrid>
                    {trackerData.map((day, index) => (
                        <CalendarDay
                            key={index}
                            className={day.type}
                            $isToday={day.isToday}
                            $isEmpty={!day.date}
                        >
                            {day.date}
                        </CalendarDay>
                    ))}
                </CalendarGrid>

                <Legend>
                    <LegendItem>
                        <LegendDot className="period" />
                        <span>Period</span>
                    </LegendItem>
                    <LegendItem>
                        <LegendDot className="fertile" />
                        <span>Fertile Window</span>
                    </LegendItem>
                    <LegendItem>
                        <LegendDot className="ovulation" />
                        <span>Ovulation</span>
                    </LegendItem>
                    <LegendItem>
                        <LegendDot className="pre-period" />
                        <span>Pre-Period</span>
                    </LegendItem>
                    <LegendItem>
                        <LegendDot className="post-period" />
                        <span>Post-Period</span>
                    </LegendItem>
                </Legend>
            </CalendarCard>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding: var(--space-4);
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: var(--space-2);
        gap: var(--space-4);
    }
`;

const CalculatorCard = styled.div`
    background: white;
    border-radius: var(--radius-3xl);
    padding: var(--space-8);
    box-shadow: var(--shadow-soft-lg);
    border: 1px solid var(--color-dark-100);
    transition: all var(--transition-base);

    &:hover {
        box-shadow: var(--shadow-soft-xl);
    }

    @media (max-width: 768px) {
        padding: var(--space-5);
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
    padding-bottom: var(--space-6);
    border-bottom: 2px solid var(--color-dark-100);
`;

const IconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: var(--radius-2xl);
    background: var(--gradient-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    box-shadow: var(--shadow-md), var(--shadow-glow-primary);
`;

const HeaderContent = styled.div`
    flex: 1;

    h2 {
        font-family: var(--font-heading);
        font-size: var(--text-3xl);
        font-weight: 600;
        color: var(--color-dark-900);
        margin-bottom: var(--space-1);
    }

    p {
        font-size: var(--text-base);
        color: var(--color-dark-500);
    }
`;

const InputGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        gap: var(--space-5);
    }
`;

const InputField = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-700);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const InfoIcon = styled.button`
    background: none;
    border: none;
    color: var(--color-primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1rem;
    padding: 0;
    transition: color var(--transition-base);

    &:hover {
        color: var(--color-primary-700);
    }
`;

const DateInput = styled.input`
    padding: var(--space-4);
    border: 2px solid var(--color-dark-200);
    border-radius: var(--radius-xl);
    font-size: var(--text-base);
    font-family: var(--font-body);
    color: var(--color-dark-900);
    background: white;
    transition: all var(--transition-base);
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: var(--color-primary-400);
        box-shadow: 0 0 0 4px var(--color-primary-100);
    }

    &:hover {
        border-color: var(--color-dark-300);
    }
`;

const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
`;

const Slider = styled.input`
    width: 100%;
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--color-dark-200);
    outline: none;
    -webkit-appearance: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--gradient-primary);
        cursor: pointer;
        box-shadow: var(--shadow-md), var(--shadow-glow-primary);
        transition: all var(--transition-base);

        &:hover {
            transform: scale(1.1);
        }
    }

    &::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--gradient-primary);
        cursor: pointer;
        border: none;
        box-shadow: var(--shadow-md), var(--shadow-glow-primary);
        transition: all var(--transition-base);

        &:hover {
            transform: scale(1.1);
        }
    }
`;

const SliderValue = styled.div`
    text-align: center;
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-primary-600);
    padding: var(--space-2) var(--space-4);
    background: var(--color-primary-50);
    border-radius: var(--radius-lg);
    width: fit-content;
    margin: 0 auto;
`;

const InfoBox = styled.div`
    margin-top: var(--space-6);
    padding: var(--space-4);
    background: var(--color-primary-50);
    border-left: 4px solid var(--color-primary-500);
    border-radius: var(--radius-lg);

    p {
        font-size: var(--text-sm);
        color: var(--color-dark-700);
        line-height: 1.6;
        margin: 0;
    }
`;

const PredictionsCard = styled.div`
    background: linear-gradient(135deg, var(--color-primary-50), var(--color-secondary-50));
    border-radius: var(--radius-3xl);
    padding: var(--space-8);
    box-shadow: var(--shadow-soft-lg);
    border: 1px solid var(--color-primary-200);
    animation: slideIn 0.5s ease-out;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        padding: var(--space-5);
    }
`;

const PredictionsHeader = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
    color: var(--color-primary-700);

    svg {
        font-size: 1.5rem;
    }

    h3 {
        font-family: var(--font-heading);
        font-size: var(--text-2xl);
        font-weight: 600;
        margin: 0;
    }
`;

const PredictionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const PredictionItem = styled.div`
    background: white;
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    text-align: center;
    box-shadow: var(--shadow-soft);
    border: 2px solid transparent;
    transition: all var(--transition-base);

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-soft-lg);
    }

    &.next-period {
        border-color: var(--color-primary-300);
    }

    &.ovulation {
        border-color: var(--color-secondary-300);
    }

    &.fertile {
        border-color: var(--color-accent-300);
    }
`;

const PredictionLabel = styled.div`
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-dark-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-2);
`;

const PredictionValue = styled.div`
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-1);
`;

const PredictionSubtext = styled.div`
    font-size: var(--text-sm);
    color: var(--color-dark-500);
`;

const CalendarCard = styled.div`
    background: white;
    border-radius: var(--radius-3xl);
    padding: var(--space-8);
    box-shadow: var(--shadow-soft-lg);
    border: 1px solid var(--color-dark-100);

    @media (max-width: 768px) {
        padding: var(--space-5);
    }
`;

const CalendarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-6);
`;

const NavButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    border: 2px solid var(--color-dark-200);
    background: white;
    color: var(--color-dark-700);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);

    &:hover {
        background: var(--color-primary-50);
        border-color: var(--color-primary-400);
        color: var(--color-primary-600);
        transform: scale(1.05);
    }
`;

const MonthYear = styled.h3`
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin: 0;
`;

const WeekDaysRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--space-2);
    margin-bottom: var(--space-3);
`;

const WeekDay = styled.div`
    text-align: center;
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: var(--space-2);
`;

const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--space-2);
    margin-bottom: var(--space-6);
`;

const CalendarDay = styled.div`
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-lg);
    font-weight: 600;
    font-size: var(--text-base);
    transition: all var(--transition-base);
    cursor: pointer;
    position: relative;

    ${props => props.$isEmpty && `
        visibility: hidden;
    `}

    ${props => props.$isToday && `
        border: 2px solid var(--color-primary-500);
        box-shadow: 0 0 0 2px var(--color-primary-100);
    `}

    &:not(.period):not(.fertile):not(.ovulation):not(.pre-period):not(.post-period) {
        color: var(--color-dark-600);
        background: var(--color-dark-50);

        &:hover {
            background: var(--color-dark-100);
        }
    }

    &.period {
        background: var(--color-primary-500);
        color: white;
        box-shadow: var(--shadow-md);

        &:hover {
            background: var(--color-primary-600);
            transform: scale(1.05);
        }
    }

    &.fertile {
        background: var(--color-accent-400);
        color: white;
        box-shadow: var(--shadow-md);

        &:hover {
            background: var(--color-accent-500);
            transform: scale(1.05);
        }
    }

    &.ovulation {
        background: var(--color-secondary-500);
        color: white;
        box-shadow: var(--shadow-md), var(--shadow-glow-secondary);

        &:hover {
            background: var(--color-secondary-600);
            transform: scale(1.1);
        }
    }

    &.pre-period {
        background: var(--color-accent-200);
        color: var(--color-dark-700);

        &:hover {
            background: var(--color-accent-300);
        }
    }

    &.post-period {
        background: var(--color-secondary-200);
        color: var(--color-dark-700);

        &:hover {
            background: var(--color-secondary-300);
        }
    }
`;

const Legend = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-4);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-dark-100);
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-dark-700);
`;

const LegendDot = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-shadow: var(--shadow-sm);

    &.period {
        background: var(--color-primary-500);
    }

    &.fertile {
        background: var(--color-accent-400);
    }

    &.ovulation {
        background: var(--color-secondary-500);
    }

    &.pre-period {
        background: var(--color-accent-200);
    }

    &.post-period {
        background: var(--color-secondary-200);
    }
`;

export default PeriodSelection;
