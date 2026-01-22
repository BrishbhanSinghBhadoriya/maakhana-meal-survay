'use client'

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, LogOut } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

type SubscriptionType = 'Standard Veg' | 'Standard Non-Veg' | 'Gym Bro Veg' | 'Gym Bro Non-Veg';
type MealType = 'breakfast' | 'lunch' | 'dinner';
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface MenuItem {
  day: DayOfWeek;
  name: string;
  description: string;
}

interface MenuSection {
  title: string;
  subtitle: string;
  items: MenuItem[];
}

type Selections = Record<MealType, Record<string, boolean>>;

const MaaKhanaSurvey = () => {
  const { user, signOut } = useAuth();
  if (!user) {
    return null;
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionType | null>(null);
  const [selections, setSelections] = useState<Selections>({
    breakfast: {},
    lunch: {},
    dinner: {}
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Breakfast Menu (Same for all subscription types)
  const breakfastMenu: MenuSection = {
    title: "Select your favorite breakfast days",
    subtitle: "Choose which days you'd like each breakfast option",
    items: [
      { day: 'Monday', name: 'Poha', description: '250-280g with peanuts + banana or seasonal fruit' },
      { day: 'Tuesday', name: 'Vegetable Dalia', description: '300g soft cooked with optional ghee' },
      { day: 'Wednesday', name: 'Besan Chilla', description: '2 medium chillas + chutney + small curd' },
      { day: 'Thursday', name: 'Masala Oats', description: '300g thick Indian style + peanuts or sprouts' },
      { day: 'Friday', name: 'Aloo Paratha', description: '1 large shallow cooked + curd' },
      { day: 'Saturday', name: 'Vegetable Sandwich', description: '2 filled triangles + chutney + fruit' },
      { day: 'Sunday', name: 'Cornflakes/Masala Oats', description: 'With milk + banana' }
    ]
  };

  // Standard Veg Lunch Menu
  const standardVegLunchMenu: MenuSection = {
    title: "Select your favorite lunch days",
    subtitle: "Choose which days you'd like each lunch option",
    items: [
      { day: 'Monday', name: 'Arhar Dal Combo', description: 'Arhar dal + aloo gobhi + rice + 2 rotis + salad' },
      { day: 'Tuesday', name: 'Rajma Combo', description: 'Rajma + cabbage peas sabzi + rice + 2 rotis' },
      { day: 'Wednesday', name: 'Chole Combo', description: 'Chole + lauki chana dal + rice + 2 rotis' },
      { day: 'Thursday', name: 'Dal Makhani Combo', description: 'Light dal makhani + seasonal veg + rice + 2 rotis' },
      { day: 'Friday', name: 'Kadhi Pakoda Combo', description: 'Kadhi pakoda + jeera aloo + rice + 2 rotis' },
      { day: 'Saturday', name: 'Mix Dal Combo', description: 'Mix dal + bhindi fry + rice + 2 rotis' },
      { day: 'Sunday', name: 'Veg Pulao', description: 'Veg pulao + raita + papad' }
    ]
  };

  // Standard Non-Veg Lunch Menu (includes chicken on Wed & Sun)
  const standardNonVegLunchMenu: MenuSection = {
    title: "Select your favorite lunch days",
    subtitle: "Choose which days you'd like each lunch option (Non-veg on Wed & Sun)",
    items: [
      { day: 'Monday', name: 'Arhar Dal Combo', description: 'Arhar dal + aloo gobhi + rice + 2 rotis + salad' },
      { day: 'Tuesday', name: 'Rajma Combo', description: 'Rajma + cabbage peas sabzi + rice + 2 rotis' },
      { day: 'Wednesday', name: 'Chicken Masala', description: 'Chicken masala (140-160g) + rice + raita' },
      { day: 'Thursday', name: 'Dal Makhani Combo', description: 'Light dal makhani + seasonal veg + rice + 2 rotis' },
      { day: 'Friday', name: 'Kadhi Pakoda Combo', description: 'Kadhi pakoda + jeera aloo + rice + 2 rotis' },
      { day: 'Saturday', name: 'Mix Dal Combo', description: 'Mix dal + bhindi fry + rice + 2 rotis' },
      { day: 'Sunday', name: 'Chicken Masala / Egg Curry', description: 'Chicken masala or egg curry + rice + raita' }
    ]
  };

  // Gym Bro Veg Lunch Menu
  const gymBroVegLunchMenu: MenuSection = {
    title: "Select your favorite high-protein lunch days",
    subtitle: "Choose which days you'd like each lunch option (150g+ protein daily)",
    items: [
      { day: 'Monday', name: 'Double Dal + Soya Chunks', description: 'Double dal + soya chunks (60g raw) + 2 rotis' },
      { day: 'Tuesday', name: 'Paneer Combo', description: 'Paneer (200g) + dal + 2 rotis' },
      { day: 'Wednesday', name: 'Double Dal + Soya Chunks', description: 'Double dal + soya chunks (60g raw) + 2 rotis' },
      { day: 'Thursday', name: 'Paneer Combo', description: 'Paneer (200g) + dal + 2 rotis' },
      { day: 'Friday', name: 'Double Dal + Soya Chunks', description: 'Double dal + soya chunks (60g raw) + 2 rotis' },
      { day: 'Saturday', name: 'Paneer Combo', description: 'Paneer (200g) + dal + 2 rotis' },
      { day: 'Sunday', name: 'High Protein Veg Pulao', description: 'Veg pulao with extra paneer + raita' }
    ]
  };

  // Gym Bro Non-Veg Lunch Menu
  const gymBroNonVegLunchMenu: MenuSection = {
    title: "Select your favorite high-protein lunch days",
    subtitle: "Choose which days you'd like each lunch option (150g+ protein daily)",
    items: [
      { day: 'Monday', name: 'Chicken Breast Curry', description: 'Chicken breast (180-200g raw) + small dal + 2 rotis' },
      { day: 'Tuesday', name: 'Chicken Breast Curry', description: 'Chicken breast (180-200g raw) + small dal + 2 rotis' },
      { day: 'Wednesday', name: 'Chicken Breast Curry', description: 'Chicken breast (180-200g raw) + small dal + 2 rotis' },
      { day: 'Thursday', name: 'Chicken Breast Curry', description: 'Chicken breast (180-200g raw) + small dal + 2 rotis' },
      { day: 'Friday', name: 'Chicken Breast Curry', description: 'Chicken breast (180-200g raw) + small dal + 2 rotis' },
      { day: 'Saturday', name: 'Chicken Breast Curry', description: 'Chicken breast (180-200g raw) + small dal + 2 rotis' },
      { day: 'Sunday', name: 'Chicken Breast Curry', description: 'Chicken breast (180-200g raw) + small dal + 2 rotis' }
    ]
  };

  // Standard Veg Dinner Menu
  const standardVegDinnerMenu: MenuSection = {
    title: "Select your favorite dinner days",
    subtitle: "Choose which days you'd like each dinner option",
    items: [
      { day: 'Monday', name: 'Dal & Sabzi', description: '3 rotis + seasonal veg (150g) + dal (full bowl)' },
      { day: 'Tuesday', name: 'Dal Khichdi', description: 'Rice + dal-heavy khichdi + optional ghee' },
      { day: 'Wednesday', name: 'Matar Mushroom', description: '3 rotis + matar mushroom + dal' },
      { day: 'Thursday', name: 'Lemon Dal Combo', description: 'Rice + lemon dal + seasonal veg' },
      { day: 'Friday', name: 'Paneer Bhurji', description: '3 rotis + paneer bhurji (120-140g) + salad' },
      { day: 'Saturday', name: 'Veg Pulao', description: 'Generous portion veg pulao + raita' },
      { day: 'Sunday', name: 'Mixed Veg Curry', description: '3 rotis + home-style mixed veg curry + dal' }
    ]
  };

  // Standard Non-Veg Dinner Menu (includes chicken on Wed & Sun)
  const standardNonVegDinnerMenu: MenuSection = {
    title: "Select your favorite dinner days",
    subtitle: "Choose which days you'd like each dinner option (Non-veg on Wed & Sun)",
    items: [
      { day: 'Monday', name: 'Dal & Sabzi', description: '3 rotis + seasonal veg (150g) + dal (full bowl)' },
      { day: 'Tuesday', name: 'Dal Khichdi', description: 'Rice + dal-heavy khichdi + optional ghee' },
      { day: 'Wednesday', name: 'Chicken Curry', description: 'Chicken curry (140-160g) + 3 rotis or rice' },
      { day: 'Thursday', name: 'Lemon Dal Combo', description: 'Rice + lemon dal + seasonal veg' },
      { day: 'Friday', name: 'Paneer Bhurji', description: '3 rotis + paneer bhurji (120-140g) + salad' },
      { day: 'Saturday', name: 'Veg Pulao', description: 'Generous portion veg pulao + raita' },
      { day: 'Sunday', name: 'Chicken Curry', description: 'Chicken curry (140-160g) + 3 rotis or rice' }
    ]
  };

  // Gym Bro Veg Dinner Menu
  const gymBroVegDinnerMenu: MenuSection = {
    title: "Select your favorite high-protein dinner days",
    subtitle: "Choose which days you'd like each dinner option (150g+ protein daily)",
    items: [
      { day: 'Monday', name: 'Paneer Curry', description: 'Paneer (150-200g) + 3 rotis + light veg' },
      { day: 'Tuesday', name: 'Egg Curry', description: 'Egg curry (3 eggs) + 3 rotis + light veg' },
      { day: 'Wednesday', name: 'Paneer Curry', description: 'Paneer (150-200g) + 3 rotis + light veg' },
      { day: 'Thursday', name: 'Egg Curry', description: 'Egg curry (3 eggs) + 3 rotis + light veg' },
      { day: 'Friday', name: 'Paneer Curry', description: 'Paneer (150-200g) + 3 rotis + light veg' },
      { day: 'Saturday', name: 'Egg Curry', description: 'Egg curry (3 eggs) + 3 rotis + light veg' },
      { day: 'Sunday', name: 'Paneer Curry', description: 'Paneer (150-200g) + 3 rotis + light veg' }
    ]
  };

  // Gym Bro Non-Veg Dinner Menu
  const gymBroNonVegDinnerMenu: MenuSection = {
    title: "Select your favorite high-protein dinner days",
    subtitle: "Choose which days you'd like each dinner option (150g+ protein daily)",
    items: [
      { day: 'Monday', name: 'Chicken Curry', description: 'Chicken (150g) + 3 rotis + light veg' },
      { day: 'Tuesday', name: 'Chicken Curry', description: 'Chicken (150g) + 3 rotis + light veg' },
      { day: 'Wednesday', name: 'Chicken Curry', description: 'Chicken (150g) + 3 rotis + light veg' },
      { day: 'Thursday', name: 'Chicken Curry', description: 'Chicken (150g) + 3 rotis + light veg' },
      { day: 'Friday', name: 'Chicken Curry', description: 'Chicken (150g) + 3 rotis + light veg' },
      { day: 'Saturday', name: 'Chicken Curry', description: 'Chicken (150g) + 3 rotis + light veg' },
      { day: 'Sunday', name: 'Chicken Curry', description: 'Chicken (150g) + 3 rotis + light veg' }
    ]
  };

  // Get menu based on subscription type
  const getMenuForMeal = (mealType: MealType): MenuSection => {
    if (mealType === 'breakfast') {
      return breakfastMenu;
    }

    if (!subscriptionType) {
      return breakfastMenu; // fallback
    }

    if (mealType === 'lunch') {
      switch (subscriptionType) {
        case 'Standard Veg':
          return standardVegLunchMenu;
        case 'Standard Non-Veg':
          return standardNonVegLunchMenu;
        case 'Gym Bro Veg':
          return gymBroVegLunchMenu;
        case 'Gym Bro Non-Veg':
          return gymBroNonVegLunchMenu;
        default:
          return standardVegLunchMenu;
      }
    }

    // dinner
    switch (subscriptionType) {
      case 'Standard Veg':
        return standardVegDinnerMenu;
      case 'Standard Non-Veg':
        return standardNonVegDinnerMenu;
      case 'Gym Bro Veg':
        return gymBroVegDinnerMenu;
      case 'Gym Bro Non-Veg':
        return gymBroNonVegDinnerMenu;
      default:
        return standardVegDinnerMenu;
    }
  };

  const steps = ['subscription', 'breakfast', 'lunch', 'dinner'];
  const currentStepType = steps[currentStep];
  const currentMealType = currentStepType === 'subscription' ? null : (currentStepType as MealType);
  const currentMenu = currentMealType ? getMenuForMeal(currentMealType) : null;

  const handleSelection = (itemKey: string, isSelected: boolean) => {
    if (!currentMealType) return;
    
    setSelections(prev => ({
      ...prev,
      [currentMealType]: {
        ...prev[currentMealType],
        [itemKey]: isSelected
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    const breakfastAnswers = Object.entries(selections.breakfast)
      .filter(([_, selected]) => selected)
      .map(([key]) => {
        const item = breakfastMenu.items[parseInt(key)];
        return `${item.day}: ${item.name}`;
      });

    const lunchMenu = getMenuForMeal('lunch');
    const lunchAnswers = Object.entries(selections.lunch)
      .filter(([_, selected]) => selected)
      .map(([key]) => {
        const item = lunchMenu.items[parseInt(key)];
        return `${item.day}: ${item.name}`;
      });

    const dinnerMenu = getMenuForMeal('dinner');
    const dinnerAnswers = Object.entries(selections.dinner)
      .filter(([_, selected]) => selected)
      .map(([key]) => {
        const item = dinnerMenu.items[parseInt(key)];
        return `${item.day}: ${item.name}`;
      });

    const answers = {
      breakfast: breakfastAnswers,
      lunch: lunchAnswers,
      dinner: dinnerAnswers
    };

    // Generate a unique survey ID
    const surveyId = `survey_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Prepare the payload
    const payload = {
      surveyId: surveyId,
      firebaseUid: user.uid,
      subscriptionType: subscriptionType,
      answers: answers
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error('API URL is not configured');
      }

      const response = await fetch(`${apiUrl}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Failed to submit survey: ${response.statusText}`);
      }

      const data = await response.json();

      // Set submitted data and show success screen
      setSubmittedData({
        ...payload,
        response: data,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });


      console.log('Survey submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Failed to submit survey. Please try again.');
    }
  };

  const getSelectionCount = (mealType: MealType) => {
    return Object.values(selections[mealType]).filter(Boolean).length;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Success Screen
  if (isSubmitted && submittedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-green-100">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="/maa_khaana.png"
                  alt="MaaKhana Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <div>
                  <h1 className="text-3xl font-bold text-green-600">MaaKhana</h1>
                  <p className="text-gray-600 mt-1">Survey Submitted Successfully!</p>
                </div>
              </div>
              {user && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-10 h-10 rounded-full border-2 border-green-300"
                      />
                    )}
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-semibold text-gray-800">{user.displayName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg font-medium hover:bg-green-200 transition-all"
                    title="Sign out"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Success Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Success Icon and Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
              <Check size={48} className="text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Survey Submitted Successfully! 🎉
            </h2>
            <p className="text-lg text-gray-600">
              Thank you for sharing your meal preferences with us!
            </p>
          </div>

          {/* Submitted Data Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
              Submission Details
            </h3>

            {/* Survey ID and User Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Survey ID</p>
                <p className="font-mono text-sm font-semibold text-orange-600 break-all">
                  {submittedData.surveyId}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Firebase UID</p>
                <p className="font-mono text-sm font-semibold text-blue-600 break-all">
                  {submittedData.firebaseUid}
                </p>
              </div>
            </div>

            {/* Subscription Type */}
            <div className="bg-teal-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Subscription Plan</p>
              <p className="font-semibold text-teal-600 text-lg">
                {submittedData.subscriptionType}
              </p>
            </div>

            {/* Submission Time */}
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Submitted At</p>
              <p className="font-semibold text-purple-600">
                {submittedData.submittedAt}
              </p>
            </div>

            {/* Your Selections */}
            <h4 className="text-xl font-bold text-gray-800 mb-4">Your Meal Preferences</h4>

            {/* Breakfast */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h5 className="text-lg font-semibold text-gray-700">Breakfast</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {submittedData.answers.breakfast.length > 0 ? (
                  submittedData.answers.breakfast.map((item: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium border border-yellow-300"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 italic">None selected</span>
                )}
              </div>
            </div>

            {/* Lunch */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h5 className="text-lg font-semibold text-gray-700">Lunch</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {submittedData.answers.lunch.length > 0 ? (
                  submittedData.answers.lunch.map((item: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-300"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 italic">None selected</span>
                )}
              </div>
            </div>

            {/* Dinner */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <h5 className="text-lg font-semibold text-gray-700">Dinner</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {submittedData.answers.dinner.length > 0 ? (
                  submittedData.answers.dinner.map((item: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium border border-indigo-300"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 italic">None selected</span>
                )}
              </div>
            </div>

            {/* API Response (if available) */}
            {submittedData.response && (
              <div className="mt-6 pt-6 border-t">
                <h5 className="text-lg font-semibold text-gray-700 mb-3">Server Response</h5>
                <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-700 font-mono">
                    {JSON.stringify(submittedData.response, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSubmittedData(null);
                setSubscriptionType(null);
                setCurrentStep(0);
                setSelections({ breakfast: {}, lunch: {}, dinner: {} });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
            >
              Submit Another Response
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
            <p>MaaKhana - Delivering home-style meals across Delhi NCR</p>
            <p className="mt-1">Fresh, nutritious, and made with love 🧡</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/maa_khaana.png"
                alt="MaaKhana Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-orange-600">MaaKhana</h1>
                <p className="text-gray-600 mt-1">Home-style meals, delivered fresh</p>
              </div>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">

                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-10 h-10 rounded-full border-2 border-orange-300"
                    />
                  )}
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-semibold text-gray-800">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg font-medium hover:bg-orange-200 transition-all"
                  title="Sign out"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                  }`}>
                  {index < currentStep ? <Check size={20} /> : index + 1}
                </div>
                <span className={`text-sm mt-2 font-medium capitalize ${index === currentStep ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 rounded transition-all ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* Subscription Selection Step */}
          {currentStepType === 'subscription' ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Choose Your Subscription Plan
                </h2>
                <p className="text-gray-600">Select the plan that best fits your dietary preferences</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Standard Veg */}
                <div
                  onClick={() => setSubscriptionType('Standard Veg')}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                    subscriptionType === 'Standard Veg'
                      ? 'border-green-500 bg-green-50 shadow-sm'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">Standard Veg</h3>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      subscriptionType === 'Standard Veg'
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {subscriptionType === 'Standard Veg' && <Check size={16} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Vegetarian meals all 7 days</p>
                  <p className="text-green-600 font-semibold text-sm">₹110-120 per day</p>
                </div>

                {/* Standard Non-Veg */}
                <div
                  onClick={() => setSubscriptionType('Standard Non-Veg')}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                    subscriptionType === 'Standard Non-Veg'
                      ? 'border-orange-500 bg-orange-50 shadow-sm'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">Standard Non-Veg</h3>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      subscriptionType === 'Standard Non-Veg'
                        ? 'border-orange-500 bg-orange-500'
                        : 'border-gray-300'
                    }`}>
                      {subscriptionType === 'Standard Non-Veg' && <Check size={16} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Veg meals + non-veg on Wed & Sun</p>
                  <p className="text-orange-600 font-semibold text-sm">₹125-135 per day</p>
                </div>

                {/* Gym Bro Veg */}
                <div
                  onClick={() => setSubscriptionType('Gym Bro Veg')}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                    subscriptionType === 'Gym Bro Veg'
                      ? 'border-purple-500 bg-purple-50 shadow-sm'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">Gym Bro Pack Veg</h3>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      subscriptionType === 'Gym Bro Veg'
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {subscriptionType === 'Gym Bro Veg' && <Check size={16} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">High-protein veg (150g+ protein/day)</p>
                  <p className="text-purple-600 font-semibold text-sm">₹155-175 per day</p>
                </div>

                {/* Gym Bro Non-Veg */}
                <div
                  onClick={() => setSubscriptionType('Gym Bro Non-Veg')}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                    subscriptionType === 'Gym Bro Non-Veg'
                      ? 'border-red-500 bg-red-50 shadow-sm'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">Gym Bro Pack Non-Veg</h3>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      subscriptionType === 'Gym Bro Non-Veg'
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}>
                      {subscriptionType === 'Gym Bro Non-Veg' && <Check size={16} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">High-protein with chicken (150g+ protein/day)</p>
                  <p className="text-red-600 font-semibold text-sm">₹185-210 per day</p>
                </div>
              </div>
            </>
          ) : currentMenu ? (
            /* Meal Selection Steps */
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentMenu.title}
                </h2>
                <p className="text-gray-600">{currentMenu.subtitle}</p>
                {currentMealType && (
                  <p className="text-sm text-orange-600 mt-2">
                    Selected: {getSelectionCount(currentMealType)} days
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {currentMenu.items.map((meal, index) => {
                  const itemKey = index.toString();
                  const isSelected = currentMealType ? selections[currentMealType][itemKey] : false;

                  return (
                    <div
                      key={itemKey}
                      onClick={() => handleSelection(itemKey, !isSelected)}
                      className={`border-2 rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 shadow-sm'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                              {meal.day}
                            </span>
                            <h3 className="text-lg md:text-xl font-bold text-gray-800">
                              {meal.name}
                            </h3>
                          </div>
                          <p className="text-sm md:text-base text-gray-600 mt-2">
                            {meal.description}
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <Check size={16} className="text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${currentStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50'
              }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
            >
              Submit Survey
              <Check size={20} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentStepType === 'subscription' && !subscriptionType}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
                currentStepType === 'subscription' && !subscriptionType
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              Next
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>MaaKhana - Delivering home-style meals across Delhi NCR</p>
          <p className="mt-1">Fresh, nutritious, and made with love 🧡</p>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <ProtectedRoute>
      <MaaKhanaSurvey />
    </ProtectedRoute>
  );
}
