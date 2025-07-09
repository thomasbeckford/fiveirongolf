import { Tab } from 'payload';

export const InstructorSchema: Tab = {
  label: 'Instructors',
  fields: [
    {
      type: 'group',
      name: 'InstructorSchema',
      label: 'Golf Instructors',
      fields: [
        {
          name: 'coaches',
          label: 'Golf Coaches',
          type: 'array',
          fields: [
            {
              name: 'id',
              label: 'Coach ID',
              type: 'text',
              required: true,
              admin: {
                description: 'Unique identifier for the coach (e.g., "cole-langley")'
              }
            },
            {
              name: 'name',
              label: 'Coach Name',
              type: 'text',
              required: true,
              admin: {
                description: 'Full name of the coach'
              }
            },
            {
              name: 'title',
              label: 'Job Title',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g., "Senior Golf Coach", "Golf Coach"'
              }
            },
            {
              name: 'bio',
              label: 'Biography',
              type: 'textarea',
              admin: {
                description: 'Coach background and specialties'
              }
            },
            {
              name: 'image',
              label: 'Coach Photo',
              type: 'text',
              admin: {
                description: 'URL to coach photo'
              }
            }
          ],
          admin: {
            description: 'Add golf instructors for this location'
          }
        },
        {
          name: 'bookLessonUrl',
          label: 'Book Lesson URL',
          type: 'text',
          admin: {
            description: 'Link to book a lesson'
          }
        },
        {
          name: 'learnMoreUrl',
          label: 'Learn More URL',
          type: 'text',
          admin: {
            description: 'Link to learn more about coaches'
          }
        }
      ]
    }
  ]
};
