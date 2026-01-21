'use client'

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, LogOut } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

type MealType = 'breakfast' | 'lunch' | 'dinner';

interface MenuItem {
  name: string;
  description: string;
}

interface MenuSection {
  title: string;
  subtitle: string;
  items: Record<string, MenuItem>;
}

type Selections = Record<MealType, Record<string, boolean>>;

const MaaKhanaSurvey = () => {
  const { user, signOut } = useAuth();
  if (!user) {
    return null;
  }
  console.log(user);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Selections>({
    breakfast: {},
    lunch: {},
    dinner: {}
  });

  const menuData: Record<MealType, MenuSection> = {
    breakfast: {
      title: "What's your favorite breakfast?",
      subtitle: "Select your preferred breakfast for each day",
      items: {
        1: { name: "Poha", description: "With peanuts + banana or seasonal fruit (250-280g)" },
        2: { name: "Vegetable Dalia", description: "Soft cooked with optional ghee (300g)" },
        3: { name: "Besan Chilla", description: "2 medium chillas + chutney + small curd" },
        4: { name: "Masala Oats", description: "Thick Indian style + peanuts or sprouts (300g)" },
        5: { name: "Aloo Paratha", description: "1 large paratha + curd" },
        6: { name: "Vegetable Sandwich", description: "2 filled triangles + chutney + fruit" },
        7: { name: "Cornflakes/Masala Oats", description: "With milk + banana" }
      }
    },
    lunch: {
      title: "What's your favorite lunch?",
      subtitle: "Select your preferred lunch options",
      items: {
        1: { name: "Arhar Dal Combo", description: "Arhar dal + aloo gobhi + rice + 2 rotis + salad" },
        2: { name: "Rajma Combo", description: "Rajma + cabbage peas sabzi + rice + 2 rotis" },
        3: { name: "Chole Combo", description: "Chole + lauki chana dal + rice + 2 rotis" },
        4: { name: "Dal Makhani Combo", description: "Light dal makhani + seasonal veg + rice + 2 rotis" },
        5: { name: "Kadhi Pakoda Combo", description: "Kadhi pakoda + jeera aloo + rice + 2 rotis" },
        6: { name: "Mix Dal Combo", description: "Mix dal + bhindi fry + rice + 2 rotis" },
        7: { name: "Veg Pulao", description: "Veg pulao + raita + papad" }
      }
    },
    dinner: {
      title: "What's your favorite dinner?",
      subtitle: "Select your preferred dinner options",
      items: {
        1: { name: "Dal & Sabzi", description: "3 rotis + seasonal veg (150g) + dal (full bowl)" },
        2: { name: "Dal Khichdi", description: "Rice + dal-heavy khichdi + optional ghee" },
        3: { name: "Matar Mushroom", description: "3 rotis + matar mushroom + dal" },
        4: { name: "Lemon Dal Combo", description: "Rice + lemon dal + seasonal veg" },
        5: { name: "Paneer Bhurji", description: "3 rotis + paneer bhurji (120-140g) + salad" },
        6: { name: "Veg Pulao", description: "Generous portion veg pulao + raita" },
        7: { name: "Mixed Veg Curry", description: "3 rotis + home-style mixed veg curry + dal" }
      }
    }
  };

  const steps: MealType[] = ['breakfast', 'lunch', 'dinner'];
  const currentMealType = steps[currentStep];
  const currentMenu = menuData[currentMealType];

  const handleSelection = (itemKey: string, isSelected: boolean) => {
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

  const handleSubmit = () => {
    const results = {
      breakfast: Object.entries(selections.breakfast)
        .filter(([_, selected]) => selected)
        .map(([key]) => menuData.breakfast.items[key].name),
      lunch: Object.entries(selections.lunch)
        .filter(([_, selected]) => selected)
        .map(([key]) => menuData.lunch.items[key].name),
      dinner: Object.entries(selections.dinner)
        .filter(([_, selected]) => selected)
        .map(([key]) => menuData.dinner.items[key].name)
    };

    alert('Survey Complete!\n\nYour favorites:\n' +
      `Breakfast: ${results.breakfast.join(', ') || 'None selected'}\n` +
      `Lunch: ${results.lunch.join(', ') || 'None selected'}\n` +
      `Dinner: ${results.dinner.join(', ') || 'None selected'}`
    );
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {currentMenu.title}
            </h2>
            <p className="text-gray-600">{currentMenu.subtitle}</p>
            <p className="text-sm text-orange-600 mt-2">
              Selected: {getSelectionCount(currentMealType)} {currentMealType === 'breakfast' ? 'days' : 'items'}
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(currentMenu.items).map(([itemKey, meal]) => {
              const isSelected = selections[currentMealType][itemKey];
              const showDay = currentMealType === 'breakfast';

              return (
                <div
                  key={itemKey}
                  onClick={() => handleSelection(itemKey, !isSelected)}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${isSelected
                    ? 'border-orange-500 bg-orange-50 shadow-sm'
                    : 'border-gray-200 hover:border-orange-300'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        {showDay && (
                          <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                            {itemKey}
                          </span>
                        )}
                        <h3 className="text-lg md:text-xl font-bold text-gray-800">
                          {meal.name}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 mt-2">
                        {meal.description}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 transition-all ${isSelected
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
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
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
